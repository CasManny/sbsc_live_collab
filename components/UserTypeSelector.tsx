import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  const UserTypeSelector = ({
    userType,
    setUserType,
    onClickHandler,
  }: UserTypeSelectorParams) => {
    const accessChangeHandler = (type: UserType) => {
      setUserType(type);
      onClickHandler && onClickHandler(type);
    };
    return (
      <Select
        value={userType}
        onValueChange={(type: UserType) => accessChangeHandler(type)}
      >
        <SelectTrigger className="w-fit border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-transparent">
          <SelectItem value="viewer" className="shad-select-item">
            can view
          </SelectItem>
          <SelectItem value="editor" className="shad-select-item">
            can edit
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default UserTypeSelector;
  