import { AnimatePresence, } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import { RiCloseCircleFill } from 'react-icons/ri';
import AnimateModal from './AnimateModal';
export interface ModalProps {
	title: string
	isOpen: boolean
	children: React.ReactNode
	handleClose: () => void
}


const Modal: React.FC<ModalProps> = ({ children, title, isOpen, handleClose }) => {

	return (
		<>
			{
				createPortal(
						<AnimatePresence>
							{
								isOpen &&
								(
									<AnimateModal keyBody='modal-body'>
										<div className='bg-slate-700 flex py-2 px-3 justify-between'>
											<h1 className='my-auto text-white text-xl'>{title}</h1>
											<span className='block my-auto text-2xl text-red-400 bg-white rounded-full cursor-pointer hover:text-red-500' onClick={handleClose}><RiCloseCircleFill /></span>
										</div>
										<div className='p-2 h-full'>
											{
												children
											}
										</div>
									</AnimateModal>
								)
							}
						</AnimatePresence>
					,
					document.querySelector("#modal-root") as Element
				)
			}
		</>
	)
};

export default Modal;
