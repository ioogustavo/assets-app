import axios from "axios";
import type { Asset } from "../interface/asset.interface";

interface LoginDto {
   username: string;
   password: string;
}

interface AuthResponse {
   access_token: string;
}

export const getAllAssets = async (): Promise<Asset[]> => {
   try {
      const baseUrl = import.meta.env.VITE_ALL_ASSETS;
      const { data } = await axios.get(`${baseUrl}/all`);
      return data;
   } catch (error) {
      console.error("error");
      throw new Error("No se cargó correctamente el inventario de assets");
   }
};

export const postAsset = async (
   asset: Asset
): Promise<{ message: string; asset?: Asset }> => {
   try {
      const baseUrl = import.meta.env.VITE_ALL_ASSETS;
      const { data } = await axios.post<Asset>(`${baseUrl}/create`, asset);
      return { message: "Asset creado correctamente", asset: data };
   } catch (error) {
      console.error("Error al crear asset:", error);
      return { message: "No se pudo crear el asset" };
   }
};

export const updateAsset = async (
   asset: Asset
): Promise<{ message: string; asset?: Asset }> => {
   if (!asset.id) return { message: "No se encontró el asset" };

   const baseUrl = import.meta.env.VITE_ALL_ASSETS;
   try {
      const { data } = await axios.put(
         `${baseUrl}/update/${asset.id}`, // ✅ pasamos el id en la URL
         {
            name: asset.name,
            type: asset.type,
            owner: asset.owner,
         }
      );

      return { message: "Asset actualizado correctamente", asset: data };
   } catch (error) {
      console.error("Error al actualizar asset:", error);
      return { message: "No se pudo editar el asset" };
   }
};

export const removeAsset = async (
   id: number
): Promise<{ message: string; success: boolean }> => {
   try {
      const baseUrl = import.meta.env.VITE_ALL_ASSETS;
      await axios.delete(`${baseUrl}/delete/${id}`);
      return { message: "Asset eliminado correctamente", success: true };
   } catch (error) {
      console.error("Error al eliminar asset:", error);
      return { message: "No se pudo eliminar el asset", success: false };
   }
};

export const loginUser = async (data: LoginDto): Promise<AuthResponse> => {
   try {
      const baseUrl = import.meta.env.VITE_ALL_ASSETS;
      const { data: res } = await axios.post<AuthResponse>(
         `${baseUrl}/auth/login`,
         data
      );
      return res;
   } catch (error: any) {
      console.error("Error en login:", error);
      throw new Error(
         error?.response?.data?.message || "Usuario o contraseña incorrectos"
      );
   }
};
