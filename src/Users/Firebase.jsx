import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
  authDomain: "ppc-2-a4437.firebaseapp.com",
  projectId: "ppc-2-a4437",
  storageBucket: "ppc-2-a4437.appspot.com",
  messagingSenderId: "965611487671",
  appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
  measurementId: "G-MHDSQCTZ3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use this if you're running in a testing environment
auth.settings.appVerificationDisabledForTesting = true;

// Export auth for use elsewhere
export { auth };

// Setup recaptcha function
const setupRecaptcha = (phoneNumber) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container", // This is the ID of the element where the reCAPTCHA will be rendered
    {
      size: "invisible", // Invisible reCAPTCHA
      callback: (response) => {
        console.log("Recaptcha verified");
      },
      "expired-callback": () => {
        console.log("Recaptcha expired");
      },
    },
    auth
  );

  return recaptchaVerifier.render().then(() => {
    // After reCAPTCHA has been rendered, initiate phone number authentication
    return auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent to", phoneNumber);
        return confirmationResult; // Return the confirmation result to handle the OTP verification
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.message);
      });
  });
};

export { setupRecaptcha };






// ---------------------------------------------------------------





// // src/Firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// // Your Firebase configuration object
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.firebasestorage.app",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get Firebase Auth
// const auth = getAuth(app);

// // Initialize reCAPTCHA verifier
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container',
//     {
//       size: 'invisible', // Invisible reCAPTCHA
//       callback: (response) => {
//         console.log("Recaptcha verified");
//       },
//       'expired-callback': () => {
//         console.log("Recaptcha expired");
//       }
//     },
//     auth
//   );
  
//   recaptchaVerifier.render()
//     .then(() => {
//       // Send OTP via phone number
//       signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//         .then((confirmationResult) => {
//           // Store the confirmation result to be used later
//           window.confirmationResult = confirmationResult;
//           console.log("OTP sent to phone:", phoneNumber);
//         })
//         .catch((error) => {
//           console.error("Error sending OTP:", error.message);
//         });
//     });
// };

// export { auth, setupRecaptcha };


// ---------------------------------------------------------------------















// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// // Your Firebase config (replace with your own Firebase credentials)
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.firebasestorage.app",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get Firebase Auth
// const auth = getAuth(app);

// // Initialize reCAPTCHA verifier
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container',  // This div needs to exist in your HTML (it holds the reCAPTCHA widget)
//     {
//       size: 'invisible',     // Invisible reCAPTCHA
//       callback: (response) => {
//         console.log("Recaptcha verified");
//       },
//       'expired-callback': () => {
//         console.log("Recaptcha expired");
//       }
//     },
//     auth
//   );

//   // Render the reCAPTCHA widget
//   recaptchaVerifier.render().then(() => {
//     // Send OTP via phone number
//     signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => {
//         // Store the confirmation result globally so that it can be used later for verification
//         window.confirmationResult = confirmationResult;
//         console.log("OTP sent to phone:", phoneNumber);
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error sending OTP:", error.message);
//         alert("Error sending OTP. Please try again.");
//       });
//   });
// };

// export { auth, setupRecaptcha };




// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// // Firebase configuration object (Replace these with your own)
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.firebasestorage.app",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Function to setup reCAPTCHA and send OTP
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container', // ID of the div where reCAPTCHA will be rendered
//     {
//       size: 'invisible',  // Invisible reCAPTCHA
//       callback: (response) => {
//         console.log('Recaptcha verified');
//       },
//       'expired-callback': () => {
//         console.log('Recaptcha expired');
//       }
//     },
//     auth
//   );

//   // Render the reCAPTCHA widget
//   return recaptchaVerifier.render().then(() => {
//     // Send OTP via phone number
//     return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;  // Store confirmation result for later use
//         console.log('OTP sent to:', phoneNumber);
//         return confirmationResult; // Return the confirmation result
//       })
//       .catch((error) => {
//         console.error('Error sending OTP:', error.message);
//         throw error;
//       });
//   });
// };

// export { setupRecaptcha, auth };







// // src/Firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.appspot.com",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Function to setup reCAPTCHA and send OTP
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container', // ID of the div where reCAPTCHA will be rendered
//     {
//       size: 'invisible',  // Invisible reCAPTCHA
//       callback: (response) => {
//         console.log('Recaptcha verified');
//       },
//       'expired-callback': () => {
//         console.log('Recaptcha expired');
//       }
//     },
//     auth
//   );

//   // Disable app verification for local testing (use ONLY in development)
//   auth.settings.appVerificationDisabledForTesting = true;

//   // Render the reCAPTCHA widget
//   return recaptchaVerifier.render().then(() => {
//     // Send OTP via phone number
//     return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;  // Store confirmation result for later use
//         console.log('OTP sent to:', phoneNumber);
//       })
//       .catch((error) => {
//         console.error('Error sending OTP:', error.message);
//         throw error;
//       });
//   });
// };

// export { setupRecaptcha, auth };




// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// // Firebase configuration object (Replace these with your own)
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.firebasestorage.app",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Function to setup reCAPTCHA and send OTP
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container', // ID of the div where reCAPTCHA will be rendered
//     {
//       size: 'invisible',  // Invisible reCAPTCHA
//       callback: (response) => {
//         console.log('Recaptcha verified');
//       },
//       'expired-callback': () => {
//         console.log('Recaptcha expired');
//       }
//     },
//     auth
//   );

//   // Render the reCAPTCHA widget
//   return recaptchaVerifier.render().then(() => {
//     // Send OTP via phone number
//     return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;  // Store confirmation result for later use
//         console.log('OTP sent to:', phoneNumber);
//         return confirmationResult; // Return the confirmation result
//       })
//       .catch((error) => {
//         console.error('Error sending OTP:', error.message);
//         throw error;
//       });
//   });
// };

// export { setupRecaptcha, auth };






// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider } from "firebase/auth";

// // Your Firebase configuration object (already in your file)
// const firebaseConfig = {
//   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
//   authDomain: "ppc-2-a4437.firebaseapp.com",
//   projectId: "ppc-2-a4437",
//   storageBucket: "ppc-2-a4437.firebasestorage.app",
//   messagingSenderId: "965611487671",
//   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
//   measurementId: "G-MHDSQCTZ3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get Firebase Auth
// const auth = getAuth(app);

// // Initialize reCAPTCHA verifier
// const setupRecaptcha = (phoneNumber) => {
//   const recaptchaContainer = document.getElementById('recaptcha-container'); 

//   if (!recaptchaContainer) {
//     const newRecaptchaContainer = document.createElement('div');
//     newRecaptchaContainer.id = 'recaptcha-container';
//     document.body.appendChild(newRecaptchaContainer);
//   }

//   const recaptchaVerifier = new RecaptchaVerifier(
//     'recaptcha-container',
//     {
//       size: 'invisible',
//       callback: (response) => {
//         console.log("Recaptcha verified");
//       },
//       'expired-callback': () => {
//         console.log("Recaptcha expired");
//       }
//     },
//     auth
//   );

//   recaptchaVerifier.render().then(() => {
//     signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         console.log("OTP sent to phone:", phoneNumber);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error.message);
//       });
//   });
// };

// // Function to verify OTP
// const verifyOtp = (verificationCode) => {
//   const credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, verificationCode);
//   return signInWithCredential(auth, credential)
//     .then((result) => {
//       console.log("OTP verified successfully", result);
//       return result;
//     })
//     .catch((error) => {
//       console.error("Error verifying OTP", error);
//       throw error;
//     });
// };

// export { auth, setupRecaptcha, verifyOtp };







// // // src/Firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// // // Firebase configuration object
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAcVBmlPWNa8YR1VNfSNJ6l3sPtdjEAbqs",
// //   authDomain: "ppc-2-a4437.firebaseapp.com",
// //   projectId: "ppc-2-a4437",
// //   storageBucket: "ppc-2-a4437.firebasestorage.app",
// //   messagingSenderId: "965611487671",
// //   appId: "1:965611487671:web:1ecd3e0124e6b1781fe832",
// //   measurementId: "G-MHDSQCTZ3G"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // // Function to set up reCAPTCHA and send OTP
// // const setupRecaptcha = async (phoneNumber) => {
// //   try {
// //     const recaptchaVerifier = new RecaptchaVerifier(
// //       'recaptcha-container',  // This is the element where the reCAPTCHA will be rendered
// //       {
// //         size: 'invisible',  // Invisible reCAPTCHA
// //         callback: (response) => {
// //           console.log("Recaptcha verified");
// //         },
// //         'expired-callback': () => {
// //           console.log("Recaptcha expired");
// //         }
// //       },
// //       auth
// //     );

// //     // Render the reCAPTCHA verifier
// //     await recaptchaVerifier.render();

// //     // Send OTP via phone number
// //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

// //     // Store confirmationResult to verify OTP later
// //     window.confirmationResult = confirmationResult;

// //     console.log("OTP sent to phone:", phoneNumber);
// //   } catch (error) {
// //     console.error("Error setting up reCAPTCHA or sending OTP:", error.message);
// //     throw new Error("Error setting up reCAPTCHA or sending OTP");
// //   }
// // };

// // // Function to verify the OTP
// // const verifyOtp = async (otp) => {
// //   try {
// //     // Use the confirmationResult stored after sending OTP
// //     const confirmationResult = window.confirmationResult;
// //     await confirmationResult.confirm(otp); // Confirm the OTP
// //     console.log("Phone number verified successfully");
// //   } catch (error) {
// //     console.error("Error verifying OTP:", error.message);
// //     throw new Error("OTP verification failed");
// //   }
// // };

// // export { auth, setupRecaptcha, verifyOtp };
