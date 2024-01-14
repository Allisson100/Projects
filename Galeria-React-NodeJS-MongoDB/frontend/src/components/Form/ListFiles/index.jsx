import { useDispatch, useSelector } from "react-redux"
import { CloseIcon, FileName, FileSize, FilesContainer, Item, List, Loading } from "./styles"
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { removeImageObj, reset } from "../../../store/reducers/images";
import { useEffect } from "react";

const PropsLogo ={
    color: 'white',
    size: '1.5rem',
}


export default function ListFiles() {

    const dispatch = useDispatch()

    const imagesObj = useSelector(state => state.imagesObj)

    const handleRemoveFile = (id) => {
        dispatch(removeImageObj(id))
    }

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, []);

    return (
        <FilesContainer>
            <List>
                {imagesObj.map((file, index) => (
                    <Item key={index}>
                        <CiImageOn {...PropsLogo}/>
                        <FileName>{file.name}</FileName>
                        <FileSize>{file.sizeMB}</FileSize>
                        <Loading/>
                        <CloseIcon onClick={() => handleRemoveFile(file.id)}><IoClose {...PropsLogo}/></CloseIcon>
                    </Item>
                ))}
            </List>
        </FilesContainer>
    )
}