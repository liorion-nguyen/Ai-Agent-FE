'use client';

type FeatureItem = {
  id: string;
  title: string;
};

type SidebarFeaturesProps = {
  featureData: FeatureItem[];
  activeSection: string | null;
  handleClick: (id: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const SidebarFeatures = ({
  featureData,
  activeSection,
  handleClick,
}: SidebarFeaturesProps) => {
  return (
    <div className="w-1/4 fixed top-20 h-[calc(100vh-80px)] overflow-hidden">
      <ul className="flex flex-col gap-4 pt-5">
        {featureData.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(item.id, e)}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                  : 'text-gray-600 hover:text-blue-500 hover:border-l-4 hover:border-blue-500 hover:pl-2'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFeatures;
