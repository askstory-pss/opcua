let json = {
    "bcr_list": [
        {
            "BCR": "88E1-230006",
            "CODE": 1,
            "id": 1
        },
        {
            "BCR": "88E1-230006",
            "CODE": 1,
            "id": 2
        },
        {
            "BCR": "88E1-230006",
            "CODE": 1,
            "id": 3
        },
        {
            "BCR": "88E1-230006",
            "CODE": 1,
            "id": 4
        },
        {
            "BCR": "GB24022601",
            "CODE": 1,
            "id": 5
        },
        {
            "BCR": "GB24022601",
            "CODE": 1,
            "id": 6
        }
    ]
}

// 중복 제거를 위한 Set 생성
let uniqueBCRSet = new Set();

// 중복을 제거한 새로운 배열 생성
let uniqueBcrList = json.bcr_list.filter(item => {
    if (!uniqueBCRSet.has(item.BCR)) {
        uniqueBCRSet.add(item.BCR);
        return true;
    }
    return false;
});

// 중복 제거 후의 json 객체
let newJson = {
    "bcr_list": uniqueBcrList
};

console.log(newJson);