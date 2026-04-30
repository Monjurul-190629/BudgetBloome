import { instance } from "@/lib/api/apiIntellisence";
import { WALLET_PAYLOAD } from "../type/wallet.types";

export const createWallet = ({ data }: { data: WALLET_PAYLOAD }) =>
  instance.post("/wallets", data);

export const getAllWallets = () => instance.get("/wallets");

export const getTotalBalance = () => instance.get("/wallets/total-balance");

export const updateWallet = ({
  id,
  data,
}: {
  id: string;
  data: Partial<WALLET_PAYLOAD>;
}) => instance.put(`/wallets/${id}`, data);

export const deleteWallet = ({ id }: { id: string }) =>
  instance.delete(`/wallets/${id}`);