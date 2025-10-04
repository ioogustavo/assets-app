interface CustomHeaderProps {
   title: string;
   description: string;
}

export const CustomHeader = ({ title, description }: CustomHeaderProps) => {
   return (
      <div>
         <h1>{title}</h1>
         {description}
      </div>
   );
};
