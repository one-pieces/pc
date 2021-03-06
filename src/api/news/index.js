import oib from '../axios-instance/oib';

const base = '/news';

const get = (id, params) => oib.get(`${base}/${id}`, { params }).then(res => res.data);

const destroy = (id, params) => oib.delete(`${base}/${id}`, { params }).then(res => res.data);

const list = params => oib.get(`${base}es`, { params }).then(res => res.data);

const create = params => oib.post(`${base}`, params).then(res => res.data);

const save = (id, params) => oib.put(`${base}/${id}`, params).then(res => res.data);

const recommendedList = params => oib.get(`${base}/recommendedList`, { params }).then(res => res.data);

export default {
  get,
  destroy,
  list,
  create,
  save,
  recommendedList
};
