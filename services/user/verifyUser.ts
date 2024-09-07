import userRepository from "../../repositories/userRepository";

export const verifyUserByToken = async (token: string): Promise<boolean> => {
  await userRepository.verifyAccount(token);
  return true;
};
