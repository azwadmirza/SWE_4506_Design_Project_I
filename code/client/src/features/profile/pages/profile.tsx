import { useState } from 'react';
import NavbarUser from '../../../partials/navbarUser';
import ImageInput from '../../../partials/imageInput';
import { useImageUpload } from '../../../hooks/useImageUpload';
import Loader from '../../../partials/loader';
import '../assets/css/profile.css';
import ProfileForm from '../components/form';

const  ProfilePage = () => {
  const [isLoading] = useState(false);
  const {imageURL,setImage,upload_image}=useImageUpload("/profilePicture.png");

    if(!isLoading){
      return (     
        <div>
          <NavbarUser/>
          <section>
          <div className="container h-100">
            <div className="pt-5">
          <div className="mt-5 d-lg-none d-flex justify-content-center"><ImageInput imageURL={imageURL} setImage={setImage} upload_image={upload_image}/></div></div>
            <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
            <div className="my-3 d-none d-lg-flex"><ImageInput imageURL={imageURL} setImage={setImage} upload_image={upload_image}/></div>
              <div className="profile-form-outer w-50 mt-5">
                <ProfileForm/>
              </div>
            </div>
          </div>
          </section>  
          </div>
        );
    }
    else{
      return(
        <Loader/>
      )
    }
  }
   
  export default  ProfilePage;

