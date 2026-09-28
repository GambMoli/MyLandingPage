import { PROFILE_PHOTO } from "../../content/profile";

export function Avatar({ size = 36 }: { size?: number }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {PROFILE_PHOTO ? <img src={PROFILE_PHOTO} alt="" /> : "GM"}
    </span>
  );
}
