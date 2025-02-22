import CardList from "./card";

const TabsMenu = () => {
  return (
    <div role="tablist" className="tabs tabs-lifted tabs-xl">
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All" defaultChecked />
      <div role="tabpanel" className="tab-content p-5 border border-base-300 overflow-hidden justify-center">
       <CardList type={'drive'} />
      </div>
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Users" />
      <div role="tabpanel" className="tab-content p-5 border border-base-300 overflow-hidden">
        <CardList type={'image/users'} />
      </div>
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Devices" />
      <div role="tabpanel" className="tab-content p-5 border border-base-300 overflow-hidden">
        <CardList type={'image/devices'} />
      </div>
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Hospitals" />
      <div role="tabpanel" className="tab-content p-5 border border-base-300 overflow-hidden">
        <CardList type={'image/hospitals'} />
      </div>
    </div>
  );
}

export default TabsMenu;