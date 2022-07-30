import $ from 'jquery';

export const searchNews_Ajax = (params, success_callback, error_callback) => {
    params.apiKey = "3680d943ffec40248186dfd1523315a6";
    var url = "https://newsapi.org/v2/top-headlines";

    if(params) {
        url += "?" + $.param(params);
    }

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            success_callback(data);
        })
        .catch(err => {
            error_callback(err);
        }
    );
}