import Image from 'next/image';
import { teamMembers } from '@/config/about';

export const TeamMembers = () => {
  return (
    <section className="px-5 lg:px-0 py-10 max-w-[1240px] mx-auto ">
      <h2 className="!mb-10 text-2xl md:text-3xl lg:text-[2.5rem] 2xl:text-[3rem] font-medium text-[#7065F0] text-center">
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto mt-2 lg:mt-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center justify-center md:justify-normal space-x-4 rounded-[40px] max-w-[610px] border-[2px] border-[#000929] border-opacity-15 p-4"
          >
            {/* Member Image */}
            <div className="w-fit lg:w-full">
              <div className="w-[180px] h-[180px] overflow-hidden">
                <Image
                  src={`/about/${member.image}`}
                  alt={`Picture of ${member.name}`}
                  width={180}
                  height={180}
                  className="w-full h-full rounded-full object-top object-cover"
                />
              </div>
            </div>

            {/* Member Details */}
            <div className="py-4 flex flex-col items-center lg:items-start space-y-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-[#000929]">
                  {member.name}
                </h3>
                <span className="text-[#000929] text-opacity-40 font-medium text-sm lg:text-base">
                  {member.role}
                </span>
              </div>
              <p className="text-[#000929] text-xs lg:text-sm">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
