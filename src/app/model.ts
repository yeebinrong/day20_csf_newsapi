

export interface countryList {
    name: string;
    url: string;
    code: string;
}

export interface countryArray {
    id: string;
    data: countryList[];
}

export interface Article {
    name: string;
    author: string;
    title: string;
    description: string;
    url: string;
    img: string;
    publishedAt: string;
    content: string;
}

export interface ArticleArray {
    code: string;
    articles:Article[];
}