import listingApi from './listing.api';

export default class ApiService {
  static delete = async requestData => {
    var response = await listingApi({
      method: requestData.method,
      url: requestData.url,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    return response;
  };

  static create = async requestObj => {
    var response;
    response = await listingApi({
      method: requestObj.method,
      data: requestObj.params,
      url: requestObj.url,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);
    return response;
  };

  //

  static get = async requestObj => {
    var response = await listingApi({
      method: requestObj.method,
      url: requestObj.url,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);
    return response;
  };

  static put = async requestObj => {
    var data = requestObj.params;
    var response;
    response = await listingApi({
      method: requestObj.method,

      data: JSON.stringify(data),
      url: requestObj.url,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);
    return response;
  };
}
