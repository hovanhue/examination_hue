import { instanceAxios } from '@/config/axios';

const products = {
  getAllProducts(): Promise<any> {
    const url = '/projects';
    return instanceAxios.get(url);
  },
};

export default products;
