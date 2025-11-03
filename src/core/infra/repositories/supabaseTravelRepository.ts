import { supabase } from "../supabase/client/supabaseClient";
import { ITravelRepository } from "../../domain/repositories/ITravelRepository";
import { Travel } from "../../domain/entities/Travel";
import { GeoCoordinates } from "../../domain/value-objects/GeoCoordinates";
import { Photo } from "../../domain/value-objects/Photo";

export class SupabaseTravelRepository implements ITravelRepository {
  private static instance: SupabaseTravelRepository;

  private constructor() {}

  public static getInstance(): SupabaseTravelRepository {
    if (!SupabaseTravelRepository.instance) {
      SupabaseTravelRepository.instance = new SupabaseTravelRepository();
    }
    return SupabaseTravelRepository.instance;
  }

  async save(travel: Travel): Promise<void> {
    // 🔹 Obtém o usuário autenticado no Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Erro ao obter usuário autenticado:", userError);
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    const { error } = await supabase.from("travel").insert({
      title: travel.title,
      description: travel.description,
      date: travel.date.toISOString(),
      user_id: user.id, // ✅ agora é o UUID real do usuário autenticado
      photo: travel.photo?.url,
    });

    if (error) {
      console.error("Erro ao salvar travel:", error);
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Travel | null> {
    const { data, error } = await supabase
      .from("travel")
      .select("*, user: user_id(id, name, email, latitude, longitude)")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(error.message);
    }

    if (!data) return null;

    return Travel.create(
      data.id,
      data.title,
      data.description,
      new Date(data.date),
      {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
      data.user.latitude && data.user.longitude
        ? GeoCoordinates.create(data.user.latitude, data.user.longitude)
        : undefined,
      data.photo ? Photo.create(data.photo) : undefined
    );
  }

  async findAll(): Promise<Travel[]> {
    const { data, error } = await supabase
      .from("travel")
      .select("*, user: user_id(id, name, email, latitude, longitude)");

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return [];

    return data.map((item) =>
      Travel.create(
        item.id,
        item.title,
        item.description,
        new Date(item.date),
        {
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
        },
        item.user.latitude && item.user.longitude
          ? GeoCoordinates.create(item.user.latitude, item.user.longitude)
          : undefined,
        item.photo ? Photo.create(item.photo) : undefined
      )
    );
  }

  async findByUserId(userId: string): Promise<Travel[]> {
    const { data, error } = await supabase
      .from("travel")
      .select("*, user: user_id(id, name, email, latitude, longitude)")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return [];

    return data.map((item) =>
      Travel.create(
        item.id,
        item.title,
        item.description,
        new Date(item.date),
        {
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
        },
        item.user.latitude && item.user.longitude
          ? GeoCoordinates.create(item.user.latitude, item.user.longitude)
          : undefined,
        item.photo ? Photo.create(item.photo) : undefined
      )
    );
  }

  async update(travel: Travel): Promise<void> {
    const { error } = await supabase
      .from("travel")
      .update({
        title: travel.title,
        description: travel.description,
        date: travel.date.toISOString(),
        photo: travel.photo?.url,
      })
      .eq("id", travel.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("travel").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
