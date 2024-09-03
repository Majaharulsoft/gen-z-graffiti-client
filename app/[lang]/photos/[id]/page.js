import PhotoDetails from "@/components/PhotoDetails";
import { getDictionary } from '../../disctionaries';

const PhotoDetailsPage = async ({ params: { id, lang } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <PhotoDetails
      id={id}
      lang={lang}
      dictionary={dictionary}
    />
  );
};

export default PhotoDetailsPage