import axiosClient from '@/lib/axios';
import { Action, Participant } from '@/pages/action';
import { AxiosResponse } from 'axios';

export const getActions = async (
  filterParams: [string, string][]
): Promise<Action[]> => {
  let searchString = '';
  if (filterParams.length) {
    for (const [filter, filterValue] of filterParams) {
      searchString += `&${filter}=${filterValue}`;
    }
  }
  const res: AxiosResponse<{ data: Action[] }> = await axiosClient.get(
    `/actions?include[]=formation.intitule&include[]=formation.organisme&include[]=formation.type&include[]=formation.domaine&include[]=employees${searchString}`
  );
  return res.data.data;
};

export const getParticipants = async (
  filterParams: [string, string][]
): Promise<Participant[]> => {
  let searchString = '';
  if (filterParams.length) {
    for (const [filter, filterValue] of filterParams) {
      if (filter === 'sexe') {
        searchString += `&${filter}=${filterValue[0]}`;
      } else {
        searchString += `&${filter}=${filterValue}`;
      }
    }
  }
  const res: AxiosResponse<{
    data: Participant[];
  }> = await axiosClient.get(
    `/participants?include[]=action.formation.intitule&include[]=action.formation.organisme&include[]=action.formation.type&include[]=employee${searchString}`
  );
  return res.data.data;
};

export const getAction = async (actionId: string) => {
  const res: AxiosResponse<{
    data: Action;
  }> = await axiosClient.get(
    `/actions/${
      actionId ?? ''
    }?include[]=formation.intitule&include[]=formation.type&include[]=formation.organisme&include[]=employees`
  );
  return res.data.data;
};
