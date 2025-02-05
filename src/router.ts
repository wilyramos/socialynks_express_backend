import { Router } from 'express';
import { createUser, getUser, login, updateProfile, uploadImage, getUserByHandle, searchByHandle } from './handlers';
import { body } from 'express-validator';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

const router = Router();

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('User is required'),
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .isEmail()  
        .withMessage('Email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    handleInputErrors,
    createUser
);

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('Email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    handleInputErrors,
    login 
);

router.get('/user',authenticate, getUser); // get user data
router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage('Handle is required'),
    handleInputErrors,
    authenticate, 
    updateProfile
); // update user data

// upload image

router.post('/user/image', authenticate, uploadImage);

// get user by handle
router.get('/:handle', getUserByHandle);

// search by handle
router.post('/search', 
    body('handle')
        .notEmpty()
        .withMessage('Handle is required'),
    handleInputErrors,
    searchByHandle
);

export default router;
