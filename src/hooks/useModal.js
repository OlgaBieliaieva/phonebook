import { useState } from "react";

export default function useModal(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return {isModalOpen, toggleModal}
}

// import { useRef } from 'react';

// export default function useModal() {
//   const ref = useRef(null);
//   const onOpen = () => ref.current.showModal();
//   const onClose = () => {
//     const currentClassList = ref.current.className;
//     ref.current.className = `${currentClassList} close`;
//     ref.current.close();
//     ref.current.className = currentClassList;
//   };

//   return { ref, onOpen, onClose };
// }
