const axios = require('axios');

async function fetchData(polarity, process, lotno) {
    try {
        //const response = await axios.get(`10.10.10.51:8888/facility/validate?polarity=${polarity}&process=${process}&lotno=${lotno}`);
        const response = await axios.get(`10.10.10.51:8888/facility/validate?polarity=anode&process=mixing50&lotno=E1NT02C052461101`);

        console.log(response.data);
    } catch (error) {
        // 오류 처리 및 상세 정보 출력
        if (error.response) {
          // 서버가 응답을 보낸 경우 (4xx, 5xx)
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // 요청이 전송되었으나 응답이 없는 경우
            console.error('Error request:');
        } else {
          // 요청 설정 중에 오류가 발생한 경우
            console.error('Error message:');
        }
        console.error('Error config:');
    }
}

let polarity = 'anode';
let process = 'mixing50';
let lotno = 'E1NT02C052461101';

fetchData(polarity, process, lotno);

