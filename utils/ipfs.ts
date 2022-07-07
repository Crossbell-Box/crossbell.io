export const upload = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append('file', file);

    const result = await fetch('https://ipfs-relay.crossbell.io/upload', {
        method: 'PUT',
        body: formData,
    });

    if (result.ok) {
        const res = await result.json();
        return res.url;
    }
};
