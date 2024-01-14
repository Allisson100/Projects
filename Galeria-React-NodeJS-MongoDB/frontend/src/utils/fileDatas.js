const fileData = (filesObject) => {
    const fileInfo = filesObject.map((file) => ({
        id: file.id,
        name: file.file.name,
        sizeMB: `${Math.ceil(file.file.size / (1024 * 1024))} MB`,
    }))

    return fileInfo
}

export default fileData