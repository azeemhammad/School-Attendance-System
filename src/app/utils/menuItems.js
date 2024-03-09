import { FaSchool } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { RiSchoolFill } from "react-icons/ri";


const menuItems = [
    {
      title: "Overview",
      list: [
        {
          title: "Schools",
          path: "/dashboard",
          icon: <FaSchool />,
        },
        {
          title: "Greenfield HS",
          path: "/dashboard/greenfield-hs",
          icon: <IoSchool />,
        },
        {
          title: "Pinecrest Academy",
          path: "/dashboard/pinecrest-academy",
          icon: <RiSchoolFill />,
        },
        {
          title: "Maplewood Secondary",
          path: "/dashboard/maplewood-secondary",
          icon: <FaSchool />,
        },
        {
          title: "Riverdale Elementary",
          path: "/dashboard/riverdale-elementary",
          icon: <IoSchool />,
        },
        {
          title: "Sunnyside prep",
          path: "/dashboard/sunnyside-prep",
          icon: <RiSchoolFill />,
        },
        {
          title: "Oakridge Int'l School",
          path: "/dashboard/oakridge",
          icon: <FaSchool />,
        },
        {
          title: "Willowbrook Primary",
          path: "/dashboard/willowbrook-primary",
          icon: <IoSchool />,
        },
        {
          title: "Harmony Academy",
          path: "/dashboard/harmony-academy",
          icon: <RiSchoolFill />,
        },
  
        
      ],
    },
    
  ];
  
  export default menuItems;