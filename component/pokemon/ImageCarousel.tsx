import { Carousel, Image } from "antd";

export default function ImageCarousel({
  listImage = [],
  width = 360,
}: {
  listImage: string[];
  width: number;
}) {
  const eListImage: string[] = [];
  listImage.forEach((item) => {
    if (item && typeof item === "string") {
      eListImage.push(item);
    }
  });
  return (
    <Carousel autoplay>
      {eListImage.map((item, idx) => {
        return <Image key={idx} alt={item} src={item} width={width} />;
      })}
    </Carousel>
  );
}
