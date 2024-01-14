import image from "../models/image.js"
import { promises as fsPromises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const MAX_ITEMS = 100

class ImageController {

    static async getAllImages (req, res) {
        try {
            const allImages = await image.find().limit(100)
            res.status(200).json(allImages)

        } catch (error) {
            res.status(500).json({
                message: `Error to get images ${error}`
            })
        }
    }

    static async postImage (req, res) {
        try {

            const files = req.files

            const savedImages = await Promise.all(
                files.map(async (file) => {

                    const path = file.path.replace(/\\/g, '/')
                    const removeSrc = path.replace('src/', '')

                    const newImage = new image({
                        name: file.originalname,
                        src: removeSrc,
                    });
        
                    return await newImage.save();
                })
            );

            await ImageController.removeExcessImages();

            res.status(200).json({
                message: 'Image created!',
                image: savedImages
            })
            

        } catch (error) {
            res.status(500).json({
                message: `Error to create image ${error}`
            })
        }
    }

    static async removeExcessImages() {
        try {
            const totalImages = await image.countDocuments();
            console.log(`O total de itens no banco é: ${totalImages}`);

            if (totalImages > MAX_ITEMS) {
                const excessImages = totalImages - MAX_ITEMS;

                const oldestImages = await image.find().sort({ createdAt: 1 }).limit(excessImages);

                /// Obter o caminho do módulo e converter para o caminho do sistema de arquivos
                const __filename = fileURLToPath(import.meta.url);
                const scriptDir = dirname(__filename);

                // Caminho para a pasta uploads a partir da pasta src
                const caminhoUploads = join(scriptDir, '..', 'uploads')

                // Remover arquivos da pasta
                for (const img of oldestImages) {
                    const caminhoDoArquivo = join(caminhoUploads, `${img.src.replace('uploads/', '')}`);
                    await fsPromises.unlink(caminhoDoArquivo);
                }


                await image.deleteMany({ _id: { $in: oldestImages.map(image => image._id) } });

                console.log(`Removed ${excessImages} oldest images`);
            }
        } catch (error) {
            console.error(`Erro ao remover itens excedentes: ${error}`);
        }
    }
}

export default ImageController