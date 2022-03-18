import { NewsCard, NewsCardProps } from "./NewsCard"


const news = [{
    title: "MARCH 11TH 2022 UPDATE",
    description: "Brand new UI, with new features including initial data size, date filtering, chunking, cosine similar documents, improved performance and more!",
    id: 1,
    fullText: "lorem ipsum..."
} as NewsCardProps]

export const News = () => {
    return (
        <div className="flex flex-row flex-wrap gap-4 mx-24 lg:mx-60 my-4 items-center justify-center h-full">
            {news.map((n) =>
                <>
                    <NewsCard {...n} key={n.id} />
                </>
            )}
        </div>
    )
}
