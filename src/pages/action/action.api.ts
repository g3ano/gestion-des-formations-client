import axiosClient from '@/lib/axios';
import {
  Action,
  ActionFormData,
  SearchResultShuffled,
  Participant,
  SearchIncludesFilter,
} from '@/pages/action';
import { AxiosResponse } from 'axios';

export const getActions = async (
  filterParams: [string, string][]
): Promise<Action[]> => {
  let queryString = '';
  if (filterParams.length) {
    for (const [filter, filterValue] of filterParams) {
      queryString += `&${filter}=${filterValue}`;
    }
  }
  const res: AxiosResponse<{ data: Action[] }> = await axiosClient.get(
    `/actions?includes[]=formation.intitule&includes[]=formation.organisme&includes[]=formation.type&includes[]=formation.domaine&includes[]=employees${queryString}`
  );
  return res.data.data;
};

export const getParticipants = async (filterParams: [string, string][]) => {
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
    `/participants?includes[]=action.formation.intitule&includes[]=action.formation.organisme&includes[]=action.formation.type&includes[]=employee${searchString}`
  );
  return res.data.data;
};

export const getAction = async (actionId: string) => {
  const res: AxiosResponse<{
    data: Action;
  }> = await axiosClient.get(
    `/actions/${
      actionId ?? ''
    }?includes[]=formation.intitule&includes[]=formation.type&includes[]=formation.categorie&includes[]=formation.organisme&includes[]=formation.cout&includes[]=formation.code_domaine&includes[]=formation.domaine&includes[]=formation.type&includes[]=employees`
  );
  return res.data.data;
};

export const createAction = async (action: ActionFormData) => {
  const res: AxiosResponse<{
    data: {
      message: string;
      actionId: number;
    };
  }> = await axiosClient.post('/actions', action);

  return res.data.data;
};

export const globalSearch = async ({
  includes,
  searchValue,
  page,
}: {
  includes: SearchIncludesFilter[];
  searchValue: string;
  page: number;
}) => {
  let includesQueryString = '';

  for (const include of includes) {
    if (include.checked) {
      includesQueryString += `&includes[]=${include.value}`;
    }
  }

  const res: AxiosResponse<SearchResultShuffled> = await axiosClient.get(
    `/search?query=${searchValue}${includesQueryString}&isShuffled=1&page=${page}`
  );

  return res.data;
};
