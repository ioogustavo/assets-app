import axios from "axios";
import type { Asset } from "../interface/asset.interface";

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
   try {
      const baseUrl = import.meta.env.VITE_ALL_ASSETS;
      const { data } = await axios.put<Asset>(
         `${baseUrl}/update/${asset.id}`,
         asset
      );
      return { message: "Asset actualizado correctamente", asset: data };
   } catch (error) {
      console.error("Error al actualizar asset:", error);
      return { message: "No se pudo actualizar el asset" };
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
