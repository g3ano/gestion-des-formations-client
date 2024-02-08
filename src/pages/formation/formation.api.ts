import axiosClient from '@/lib/axios';
import type { Formation, FormationFormData } from '@/pages/formation';
import { AxiosResponse } from 'axios';

export const getFormations = async (): Promise<Formation[]> => {
  const res: AxiosResponse<{ data: Formation[] }> = await axiosClient.get(
    '/formations'
  );
  return res.data.data;
};

export const deleteFormations = async (ids: (number | string)[]) => {
  const res: AxiosResponse<{
    data: { message: string; effectedRows: number };
  }> = await axiosClient.delete('/formations', {
    data: {
      ids: ids,
    },
  });
  return res.data.data;
};

export const getCommonValues = async (): Promise<{
  intitules: string[];
  organismes: string[];
  code_domaines: number[];
}> => {
  const res: AxiosResponse<{
    data: {
      intitules: string[];
      organismes: string[];
      code_domaines: number[];
    };
  }> = await axiosClient.get('/formations/commonValues');
  return res.data.data;
};

export const createFormation = async (formations: FormationFormData) => {
  const res: AxiosResponse<{
    data: {
      effected_row_id: number;
    };
  }> = await axiosClient.post('/formations', {
    ...formations,
  });
  return res.data;
};

export const getFormation = async ({
  queryKey,
}: {
  queryKey: [string, { formationId: string | undefined }];
}): Promise<Formation> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { formationId }] = queryKey;
  const res: AxiosResponse<{
    data: Formation;
  }> = await axiosClient.get(`/formations/${formationId}`);
  return res.data.data;
};

export const editFormation = async ({
  formationId,
  body,
}: {
  formationId: string | undefined;
  body: Record<string, object>;
}) => {
  const res: AxiosResponse<{
    data: {
      message: string;
      effectedRows: number;
    };
  }> = await axiosClient.put(`/formations/${formationId ?? ''}`, {
    ...body,
  });
  return res.data.data;
};
