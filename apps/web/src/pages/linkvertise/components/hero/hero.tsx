import { Collapsible } from "~/components/bedrock/collapsible";
import { HeroTitle, HeroDescription } from ".";
import { styles } from ".";
import { InformationFAQQuestion } from "~/pages/information";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card } from "~/components/bedrock/card";
import Markdown from "react-markdown";

export const Hero = () => (
  <>
    <div>
      <HeroTitle />
      <HeroDescription />
    </div>
    {/* <HeroActions /> */}
    <div className={styles.video}>
      <iframe
        width="100%"
        height="100%"
        src="" //TODO;
        title="BETTER BEDROCK V8 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

    <div className={styles.section}>
      <BedrockText
        text="Reasons To Choose Us"
        type="h2"
        font="Minecraft"
        color="white"
        textAlign="center"
      />
      <div className={styles.statistics}>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Average Earnings"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="9$ / 1k downloads"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Ad Protection"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="Anti-bypass"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Our Monthly Reach"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="Millions of visits"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
      </div>
    </div>

    <div className={styles.section}>
      <BedrockText
        text="How to begin "
        type="h2"
        font="Minecraft"
        color="white"
        textAlign="center"
      />
      <Markdown>{tutorial}</Markdown>
    </div>

    <div className={styles.section}>
      <BedrockText text="FAQ" type="h2" font="Minecraft" color="white" textAlign="center" />
      <div className={styles.question}>
        {questions.map((question, index) => (
          <Collapsible
            key={question.question}
            headerText={question.question}
            contentText={question.answer}
            width="100%"
            indexTextRef={index + 1}
          />
        ))}
      </div>
    </div>
  </>
);

const questions: InformationFAQQuestion[] = [
  {
    question: "Why should you choose us?",
    answer: "",
  },
  {
    question: "How much money will I make?",
    answer: "",
  },
  {
    question: "What do I need to do to receive money?",
    answer: "",
  },
];

// Mention invalid linkvertise token and anti bypass

const tutorial = `
Lorem markdownum et hunc goodput cernis, ibi robora per Herse isto, post,
contemptuque, domus; illi, hac. In quam Pittheus. Fontis tua. Dea quod flumina,
nec flavescere coepti. Equos cum Othryn victa pater aliisque et Phoebi ignis
laterum quas?

Vetustis accersite moenibus [essem](#quibus-iam-tamen-fluctibus) iam [de
certamine annum](#quibus-iam-tamen-fluctibus), omnique? Et nisi Colcha mala,
suscitat *sed* Crotonis armataque sed, supplex capacibus amor. Tibi pensa placet
prima falso Venulus; acta misit in factorum Cephenum, tene? Phoebo offensa,
caecis? Fuit venit in sidebarClockKoffice picea!

O lupum quater et sed usa possumus e Quodsi Nesso Achilles alimentaque sensi;
alimenta, rapta. Et o inter saevam sepulcrum arboribus, aura quid utque cavernis
steriles **acernas exiliis**. Edidit mavult mihi frustra vident glacialis
orandus neque avulsumque nec. Ut placuit imitamina hanc, ille Cyclopis foedera,
hamis *clipeum*.

Non apro visa, quattuor instimulat Lycia. **Cunarum mihi latus** iramque
sceleris, in corneaque pennis et manu est? Bello insula senior candentia cui
furta nymphae pompa intremuere secutus.
`;
