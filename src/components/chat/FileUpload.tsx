import React, { useState } from "react"

type FileUploadTypes = {
    messageId: number
}

export function FileUpload({messageId}: FileUploadTypes) {
    const [file, setFile] = useState<File | null>();
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.item(0));
    }

    const handleUpload = async (e: React.FormEvent) => {

    }
}