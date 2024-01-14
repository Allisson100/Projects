import { useEffect, useRef, useState } from "react";
import { FormContainer, FileInput , DropArea , Label } from "./styles";
import { FiUploadCloud } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addImagesObj } from "../../store/reducers/images";
import ListFiles from "./ListFiles";
import Button from "../Button";
import fileData from "../../utils/fileDatas";
import { postImagesDB } from "../../store/reducers/imagesFromDB";
import { addMessage } from "../../store/reducers/toastMessage";
import checkFiles from "../../utils/checkFiles";


const PropsLogo ={
    color: 'white',
    size: '50%'
}

export default function Form() {

    const fileInputRef = useRef(null);
    const dispatch = useDispatch()

    const [ inputFiles, setInputFiles ] = useState([])

    const imagesObj = useSelector(state => state.imagesObj)

    useEffect(() => {

        const updateInputFiles = inputFiles.filter((fileInput) => imagesObj.some((imageObj) => imageObj.id === fileInput.id))

        setInputFiles(updateInputFiles)

    }, [imagesObj])

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault();

        const droppedFiles = Array.from(event.dataTransfer.files)

        const datas = checkFiles(droppedFiles)

        if(datas.areImages) {

            dispatch(addImagesObj(fileData(datas.dataObj)))
            setInputFiles((prevFiles) => [...prevFiles, ...datas.dataObj])

            event.target.value = null;

        } else {
            dispatch(addMessage([{
                message: 'Please select image files only!',
                status: 'failed'
            }]))

            event.target.value = null;
        }
    };

    
    const handleInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        const datas = checkFiles(selectedFiles)

        if(datas.areImages) {
    
            dispatch(addImagesObj(fileData(datas.dataObj)))
            setInputFiles((prevFiles) => [...prevFiles, ...datas.dataObj])

            event.target.value = null;

        } else {
            dispatch(addMessage([{
                message: 'Please select image files only!',
                status: 'failed'
            }]))

            event.target.value = null;
        }        
    };


    const handleSubmit = async (event) => {

        event.preventDefault()

        if(inputFiles.length === 0) {
            return (
                dispatch(addMessage([{
                    message: 'No image selected!',
                    status: 'failed'
                }]))
            )
        }

        dispatch(postImagesDB(inputFiles))

        fileInputRef.current.value = ''
        setInputFiles([])
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <DropArea
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={openFileInput}
            >
                <FiUploadCloud {...PropsLogo}/>
                <Label>Drag and drop files here or click to select.</Label>
                
                <FileInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    name="file"
                    accept="image/*"
                    multiple
                />
            </DropArea>

            <ListFiles />

            <Button
                type='submmit'
            >Send images</Button>
        </FormContainer>
    )
}