export default function Review({ siteData, fonts }) {
    return(<div >
        <div
          className={`${fonts.marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
        >
          <p className="mt-24 ">Reviews</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {siteData?.reviews?.map((review, i) => (
            <div key={i} className="mt-10 mx-10 ">
              <span className="flex">
                {review.profile_photo_url && (
                  <img
                    src={review.profile_photo_url}
                    alt={`${review.author_name}'s profile`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <div className={`${fonts.marker.className} mx-2`}>
                  <div> {review.author_name}</div>
                  <div className="inline text-xs font-mono">
                    {review.relative_time_description}
                  </div>
                </div>
              </span>
              <div>
                <img
                  src={`rating/${review.rating}.png`}
                  style={{ width: "100px", height: "20px" }}
                  className="my-4"
                />
              </div>
              <div>{review.text}</div>
            </div>
          ))}
        </div>
      </div>)
}