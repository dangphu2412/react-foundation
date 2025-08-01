import {useState} from "react";

export function FileUpload() {
    const [files, setFiles] = useState<File[]>([]);

    return <div className={'space-x-2 space-y-4'}>
        <label>File Upload</label>
        <input placeholder={'Upload'} type={'file'} accept={'image/*'} multiple onChange={(e) => {
            const newFiles = Array.from(e.target.files ?? []);

            if (newFiles.length + files.length > 5) {
                alert('Upload more than 5')
                return;
            }

            setFiles(pre => [...newFiles, ...pre]);
        }}/>

        <div>
            {files.map(file => {
                return <div>{
                    file.name
                }</div>
            })}
        </div>
    </div>
}