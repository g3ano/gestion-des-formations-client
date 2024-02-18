import axiosClient from '@/lib/axios';
import { Action } from '@/pages/action';
import { Participant } from '@/pages/action/action.type';
import { AxiosResponse } from 'axios';

export const getActions = async (): Promise<Action[]> => {
  const res: AxiosResponse<{ data: Action[] }> = await axiosClient.get(
    '/actions?include[]=formation.intitule&include[]=formation.organisme&include[]=employees'
  );
  return res.data.data;
};

export const getParticipants = async (): Promise<Participant[]> => {
  const res: AxiosResponse<{
    data: Participant[];
  }> = await axiosClient.get(
    '/participants?include[]=action.formation.intitule&include[]=action.formation.organisme&include[]=employee'
  );
  return res.data.data;
};

export const getAction = async (actionId: string) => {
  const res: AxiosResponse<{
    data: Action;
  }> = await axiosClient.get(
    `/actions/${actionId ?? ''}?include[]=formation.intitule`
  );
  return res.data.data;
};
