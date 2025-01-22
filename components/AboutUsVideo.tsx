import VideoPlayer from '@/components/ui/videoPlayer';

const videos = [
  {
    src: '/video/AboutUs1.mp4',
    poster: '',
    title: 'What we do'
  },
  {
    src: '/video/AboutUs2.mp4',
    poster: '',
    title: 'Amazing app features'
  }
];

export default function AboutUsVideo() {
  return (
    <section
      id="Our-video"
      aria-labelledby="Our-video"
      className=" bg-gray-100 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#7065F0] mb-8">
          Video Playlist
        </h2>
        <VideoPlayer videos={videos} />
      </div>
    </section>
  );
}
