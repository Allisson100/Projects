import { v4 as uuidv4 } from 'uuid';

const checkFiles = (files) => {

    const areAllFilesImages = files.every(file => file.type.startsWith('image/'));

    if(areAllFilesImages) {

        const addID = files.map(file => ({
            id: uuidv4(),
            file: file
        }))

        return {
            areImages: true,
            dataObj: addID
        }

    } else {
        return {
            areImages: false,
        }
    }

}

export default checkFiles