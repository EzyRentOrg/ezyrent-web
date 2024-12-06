// src/components/RegisterImages.tsx
import React from 'react';
import { AbsoluteImage, RelativeImage } from './styledComponents';

const RegisterImages: React.FC = () => (
  <>
    <AbsoluteImage
      alt="absolute-img"
      src="https://s3-alpha-sig.figma.com/img/8e3b/f232/1c6fd71cfb53e7aceb640aeebe1b93bf?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=idoHNwFEm5LvdXTBTVb8aFMqCQdGM7~h~bK389y~MsXpowHWxzC5teILlkGcbZXcZaYTpedKq5Ip19Fo52D10Jbr~5eF-dXfp2VfvlzvzJTzD81PBNNU2xSzPhT5~d0VT8bPltZz6kxyTXGTeH-4E2laAFV30zung5ywzS7qPs5T0ZnlZnaNeAkuGuJzO0LPwuV1-kMMaJJ0HDRtKQjUXoEXyNB0-QrIAO8WROHBghjTd5~wb9-SqF-mkLgetzcxj4gHRZ2aXWbbw9BAjScWbynJtF6y51vKbov47f6-4ZNQ7Firb0TrLVl6E1yAZyD~N6xHdONa4KmxFLel16u2~g__"
    />
    <RelativeImage
      src="https://s3-alpha-sig.figma.com/img/ae6f/1df8/370f676dbac478eb4f4a087a09ce282b?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGytGPd7zbQxBo8lKPUdQ0pi3UpStbWhrRyq~GkBock9D5c~3e2lJAu6pcYKqne~smiqnjKEOXKddaNItQxRyFUAD-zzhrZTFxMc2hbAEo2GDYaLMvS8tNt5I~DfdUXmcyKW~tZm2mgXd9aDvV5LrXMawyu8Hb6nzC0ftnhJ-uVta-Qj7r~a7XFFFPDjT2P8~-nXYNvVx5oWrS1NLr7Lbcnc6PFQl2ejhOPoHcjAX5XRtgJRXY~n-VYVvt8jV8ndIHWQGJMMCm4nA1TAk8gxTkQB-1eQfkuaIRa8D0WD-Ke~EXO7928a1d48VF5u1j3NIm7BZqYjLs~Pigr5xjq8EQ__"
      alt="relative-img"
      style={{ top: '260px', left: '60px' }}
    />
  </>
);

export default RegisterImages;
