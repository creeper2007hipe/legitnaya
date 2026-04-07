export default function Footer() {
  return (
    <footer
      className="
        relative z-[1] -mt-px
        w-full
        shrink-0
        py-8
        bg-gradient-to-r from-[#f6a5a5] to-[#ff6b6b]
        text-white
      "
    >
      <div className="
        w-full
        flex
        justify-between
        items-center
        px-4 md:px-[200px]
      ">

        <h2 className="
          text-[20px] sm:text-[22px] md:text-[34px]
          font-bold uppercase
          flex-1
        ">
          НЕЖНО О КОЖЕ
        </h2>

        <div className="
          text-right
          text-[15px] sm:text-[14px] md:text-[18px]
          leading-tight
          flex-1
        ">
          <p className="font-semibold">контакты:</p>
          <p>nezhnokozhe@ru</p>
          <p>askbot.t.me</p>
        </div>

      </div>
    </footer>
  )
}
