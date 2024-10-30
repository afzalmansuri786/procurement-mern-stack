import multer from 'multer';

// Set up storage directory and filename
const storage = multer.diskStorage({
    // limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit,
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Local directory
    },
    // fileFilter: (req, file, cb) => {
    //     const filetypes = /jpeg|jpg|png|gif/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     }
    //     cb('Error: File type not supported');
    // }
    // filename: (req, file, cb) => {
    //     cb(null, `${Date.now()}-${file.originalname}`);
    // },
});

export const upload = multer({ storage });
