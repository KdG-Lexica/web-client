import { NewsCard, NewsCardProps } from "./NewsCard"


const news = [{
    title: "MARCH 11TH 2022 UPDATE",
    description: "Brand new UI, with new features including initial data size, date filtering, chunking, cosine similar documents, improved performance and more!",
    id: 1
} as NewsCardProps]

export const News = () => {
    return (
        <div className="flex flex-col items-center h-screen justify-center">
            {news.map((n) =>
                <NewsCard {...n} />
            )}
        </div>
    )
}
