import Modal from "@/components/Modal";
import PhotoDetails from "@/components/PhotoDetails";

const PhotoModal = async ({ params: { id, lang } }) => {
  // const response = await fetch(`${process.env.BASE_API_URL}/photos/${id}`);
  // const photo = await response.json();

  //   console.log(photo);
  //   console.log(id);

  return (
    <Modal>
      <PhotoDetails
        id={id}
        lang={lang}
        // photo={photo}
      />
    </Modal>
  );
};

export default PhotoModal;