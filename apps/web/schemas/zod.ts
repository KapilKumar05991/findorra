import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(16, "Invalid Password")
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const resetSchema = z.object({
  identifier: z.string().min(1, 'Unauthorized'),
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Confirm Password must be same",
  path: ["confirmPassword"]
})

export const otpSchema = z.object({
  otp: z.string().min(6, 'Enter valid OTP').max(6, 'Enter valid OTP')
})

export const phoneSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Phone number is required').max(10, 'Phone number is invalid'),
});

export const emailSchema = z.object({
  email: z.string().email('Email is required')
})

export const enquirySchema = z.object({
  name: z.string().min(3, 'Name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Phone number is required').max(10, 'Phone number is invalid'),
})

export const verifySchema = z.object({
  identifier: z.string().min(1, 'Unauthorized'),
  token: z.string().min(1, 'Token is required')
})

export const editSchema = z.object({
  user: z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.email('Email is required'),
    phone: z.string().optional(),
    image: z.file().mime(['image/jpeg', 'image/png', 'image/jpg']).optional()
  }),

  profile: z.object({
    dob: z.string("DOB is required").regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth is required'),
    gender: z.string().min(1, "Gender is required"),
    maritalStatus: z.string().min(1, "Marital Status is required"),
    occupation: z.string().min(1, "Occupation is required"),
  }),

  location: z.object({
    landmark: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    area: z.string().min(1, "Area is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
  })
})

export const businessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  tagline: z.string().optional(),
  pincode: z.string().max(6, "Invalid Pincode").min(6, "Invalid Pincode"),
  area: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  landmark: z.string().optional()
})

export const businessContactSchema = z.object({
  person: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  phone: z.string().min(1, "Phone is required").max(10, "Invalid Phone Number"),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
})

export const businessHourSchema = z.object({
  day: z.string().min(1, "Invalid Day"),
  open: z.string().optional(),
  close: z.string().optional(),
  closed: z.boolean().default(false)
})

export const businessHoursSchema = z.array(businessHourSchema).length(7)

export const businessCategoriesSchema = z.object({
  primary: z.string().min(1, "Primary category is required"),
  secondary: z.array(z.string()),
})

export const businessGallerySchema = z.object({
  files: z.array(z.file())
})
