import 'react-native-get-random-values'; 
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Erro ao obter usuário autenticado:", userError);
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    const travelId = uuidValidate(travel.id) ? travel.id : uuidv4();
    const localDate = new Date(travel.date);
    const utcDate = new Date(Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate()
    ));

    const { error } = await supabase.from("travel").insert({
      id: travelId,
      title: travel.title,
      description: travel.description,
      date: utcDate.toISOString(), 
      user_id: user.id,
      photo: travel.photo?.url ?? null,
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
        name: { value: data.user.name },
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
      console.error("Erro ao buscar viagens:", error);
      throw new Error(error.message);
    }

    if (!data) return [];

    return data
      .filter((item) => item && item.user) 
      .map((item) =>
        Travel.create(
          item.id,
          item.title,
          item.description,
          new Date(item.date),
          {
            id: item.user?.id ?? "sem-id",
            name: { value: item.user?.name ?? "Usuário desconhecido" },
            email: item.user?.email ?? "",
          },
          item.user?.latitude && item.user?.longitude
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

    if (error) throw new Error(error.message);
    if (!data) return [];

    return data
      .filter((item) => item && item.user)
      .map((item) =>
        Travel.create(
          item.id,
          item.title,
          item.description,
          new Date(item.date),
          {
            id: item.user.id,
            name: { value: item.user.name },
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

    if (error) throw new Error(error.message);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("travel").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}
