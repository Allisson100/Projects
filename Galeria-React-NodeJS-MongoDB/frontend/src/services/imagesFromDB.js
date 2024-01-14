import instance from "../common/config/api"

const imagesDBService = {

    getImagesDB: async () => {

        try {

            const response = await instance.get('/images')

            return response.data.reverse()

        } catch (error) {

            return `Erro ao obter imagens do DB: ${error.message}`
        }
    },

    postImages: async (imagesArr) => {

        const justFiles = imagesArr.map(file => file.file)

        const formData = new FormData();

        for (let i = 0; i < justFiles.length; i++) {
            formData.append('file', justFiles[i]);
        }

        try {

            const response = await instance.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response


        } catch (error) {

            return `Erro ao enviar imagens para a API: ${error.message}`
        }
    }
}

export default imagesDBService