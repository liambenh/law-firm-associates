
/* LAW FIRM & ASSOCIATES — moteur de simulation v1
   À charger après app.js. Scénarios fictifs, droit américain simplifié pour le jeu.
*/
(() => {
  const $ = id => document.getElementById(id);
  const cases = [
    {
      id: 101, title: "THE GLASS TOWER", domain: "Droit des affaires · Fraude comptable",
      client: "Northstar Biotech", court: "Los Angeles County Superior Court",
      difficulty: "Intermédiaire", fee: 42000, reputation: 4,
      brief: "Le directeur financier d'une biotech accuse son CEO d'avoir maquillé les résultats avant une levée de fonds de 80 M$. Le conseil d'administration veut une réponse en 72 heures. Ton cabinet représente la société, mais le CEO est aussi ton client historique : conflit d'intérêts potentiel.",
      phases: [
        {name:"Le conflit", scene:"La présidente du conseil exige que tu représentes simultanément la société et le CEO. Les intérêts peuvent diverger. Le CEO te demande de ne rien révéler aux administrateurs.", evidence:["Lettre de mission signée par la société, pas par le CEO personnellement","Courriel du CEO : « On règle ça en interne. Aucun écrit. »","Le conseil doit voter dans 48 heures"], prompt:"Quelle est ta première décision ?", choices:[
          ["Suspendre toute prise de position, clarifier qui est ton client et analyser le conflit", "Tu protèges l'indépendance du cabinet. Tu demandes un avis déontologique et expliques au conseil qu'une représentation distincte peut être nécessaire.",{score:3,rep:2,fee:0,heat:-1}],
          ["Accepter de défendre les deux sans informer le conseil", "Tu crées un conflit majeur. Si les intérêts divergent, la confidentialité et le devoir de loyauté deviennent intenables.",{score:-2,rep:-4,fee:0,heat:3}],
          ["Transmettre immédiatement tous les courriels du CEO au conseil", "Tu vas trop vite : tu dois d'abord vérifier tes obligations de confidentialité et le périmètre du mandat.",{score:0,rep:-1,fee:0,heat:2}]
        ]},
        {name:"La data room", scene:"L'équipe finance ouvre une data room. Des projections ont été modifiées la veille d'une présentation investisseurs. Une analyste junior affirme avoir reçu l'ordre de déplacer une charge de 12 M$ au trimestre suivant.", evidence:["Version A du tableur : charge enregistrée au trimestre courant","Version B : charge déplacée au trimestre suivant, compte utilisateur du CEO","Slack : « Il faut passer le trimestre, on corrigera après »"], prompt:"Comment sécurises-tu l'enquête ?", choices:[
          ["Préserver les données sources, journaux d'accès et métadonnées via un protocole de legal hold", "Tu préserves les preuves sans altérer les fichiers. Une chaîne de conservation documentée renforce leur valeur.",{score:3,rep:2,fee:3000,heat:0}],
          ["Demander à l'analyste de supprimer les brouillons inutiles", "Très mauvais choix : destruction potentielle de preuves et risque de spoliation.",{score:-4,rep:-5,fee:0,heat:4}],
          ["Confronter le CEO avant de copier les données", "Tu risques une altération ou une disparition des éléments. Il fallait d'abord sécuriser les sources.",{score:0,rep:-1,fee:0,heat:2}]
        ]},
        {name:"La déposition", scene:"L'analyste junior est interrogée. Elle hésite : elle craint de perdre son emploi. L'avocat adverse cherche à démontrer qu'elle a elle-même modifié le fichier.", evidence:["Elle a accès en écriture au tableur","Les logs montrent une connexion du CEO puis de l'analyste","Elle a signalé l'anomalie deux jours après"], prompt:"Quelle stratégie d'interrogatoire adoptes-tu ?", choices:[
          ["Établir calmement la chronologie, les accès et le signalement, sans lui souffler les réponses", "Tu obtiens un récit précis et testable. Tu évites de contaminer le témoignage.",{score:3,rep:2,fee:2500,heat:-1}],
          ["Lui promettre qu'elle ne sera jamais inquiétée", "Tu ne peux pas garantir cela. Une promesse imprudente détruit ta crédibilité.",{score:-2,rep:-3,fee:0,heat:2}],
          ["L'accuser d'avoir falsifié les comptes pour sauver le CEO", "Tu braques le témoin et n'exploites pas les pièces objectives.",{score:-1,rep:-2,fee:0,heat:2}]
        ]},
        {name:"La négociation", scene:"Le fonds investisseur propose 9 M$ pour renoncer à toute action, avec une clause de confidentialité et une démission du CEO. Le conseil veut négocier, mais le CEO menace de poursuivre la société.", evidence:["Offre valable 24 heures","Exposition estimée : 18 à 35 M$ selon les preuves","Assureur D&O demande une notification formelle"], prompt:"Quelle contre-proposition présentes-tu ?", choices:[
          ["Notifier l'assureur, exiger une extension du délai et négocier sur la base d'une enquête indépendante", "Tu évites de brûler les étapes et gardes des leviers. Le conseil décide en connaissance des risques.",{score:3,rep:2,fee:4000,heat:-1}],
          ["Accepter les 9 M$ immédiatement sans consulter le conseil", "Tu n'as pas le pouvoir de lier seul la société à une transaction de cette ampleur.",{score:-3,rep:-4,fee:0,heat:3}],
          ["Menacer publiquement le fonds de révéler ses propres secrets", "La pression peut se retourner contre ton client et créer de nouveaux risques juridiques.",{score:-2,rep:-3,fee:0,heat:4}]
        ]},
        {name:"L'audience", scene:"Une demande d'injonction vise à empêcher la société de détruire ou modifier les documents comptables. Le juge veut des garanties concrètes.", evidence:["Le legal hold a été envoyé à 14 personnes","Deux ordinateurs portables n'ont pas encore été collectés","Le CEO demande à l'IT de « nettoyer son poste »"], prompt:"Que demandes-tu au juge ?", choices:[
          ["Proposer une ordonnance ciblée, un tiers neutre et un calendrier de collecte", "Tu proposes une mesure proportionnée, contrôlable et crédible.",{score:3,rep:3,fee:5000,heat:-1}],
          ["Demander la saisie de tous les appareils de tous les salariés", "Demande excessive, difficile à justifier et potentiellement disproportionnée.",{score:0,rep:-1,fee:0,heat:2}],
          ["Dire que tout est déjà sécurisé alors que deux appareils manquent", "Tu risques une déclaration inexacte au tribunal.",{score:-4,rep:-5,fee:0,heat:4}]
        ]},
        {name:"Le verdict stratégique", scene:"L'enquête confirme une présentation trompeuse, mais le CEO soutient qu'il s'agissait d'une erreur de classement. Le conseil doit choisir entre transaction, action contre le CEO et coopération avec les autorités.", evidence:["Métadonnées cohérentes avec une modification volontaire","Aucun élément ne prouve encore un enrichissement personnel","Le fonds maintient une offre à 12 M$ si elle est acceptée sous 48 heures"], prompt:"Quelle recommandation finale fais-tu ?", choices:[
          ["Présenter les scénarios, coûts, risques pénaux/réglementaires et laisser le conseil décider", "Tu relies les preuves aux risques sans promettre un résultat. Le conseil prend une décision informée.",{score:3,rep:3,fee:7000,heat:0}],
          ["Garantir qu'un procès sera gagné", "Aucun avocat sérieux ne garantit une issue. Tu crées une attente dangereuse.",{score:-3,rep:-4,fee:0,heat:2}],
          ["Cacher les éléments défavorables pour obtenir un accord", "Tu compromets le devoir de conseil et la légitimité de la décision.",{score:-5,rep:-6,fee:0,heat:4}]
        ]}
      ]
    },
    {
      id:102, title:"THE LAST CALL", domain:"Droit pénal · Homicide", client:"Daniel Reyes", court:"Los Angeles County Superior Court",
      difficulty:"Difficile", fee:58000, reputation:6,
      brief:"Daniel Reyes est accusé du meurtre de son associé après une dispute dans un parking. La vidéosurveillance a un angle mort de 11 minutes. L'accusation s'appuie sur un témoin, un téléphone retrouvé dans la voiture et une trace biologique dont l'interprétation est contestée.",
      phases:[
        {name:"La première consultation",scene:"Daniel nie les faits, mais reconnaît avoir menti à la police sur sa présence au parking. Sa famille veut une conférence de presse immédiate.",evidence:["Arrestation après 36 heures d'interrogatoire","Téléphone du client saisi avec mandat contesté","Le client demande si tu peux faire disparaître un message compromettant"],prompt:"Que fais-tu en premier ?",choices:[
          ["Expliquer le secret professionnel, lui interdire toute destruction de preuve et demander le dossier complet", "Tu protèges les droits du client sans participer à une obstruction.",{score:3,rep:2,fee:3000,heat:-1}],
          ["Lui conseiller de réinitialiser son téléphone", "Obstruction potentielle et destruction de preuve : faute gravissime.",{score:-5,rep:-7,fee:0,heat:5}],
          ["Organiser une conférence de presse pour attaquer la victime", "Tu risques de contaminer les témoins et de nuire à la défense.",{score:-2,rep:-3,fee:0,heat:3}]
        ]},
        {name:"La scène",scene:"L'équipe visite le parking. L'angle mort est dû à un camion de livraison. Un badge d'accès pourrait montrer qui est entré dans le bâtiment voisin.",evidence:["Caméra 4 : intervalle manquant de 21:14 à 21:25","Registre du parking incomplet","Ticket de livraison horodaté à 21:17"],prompt:"Quel acte demandes-tu ?",choices:[
          ["Préserver les vidéos voisines, le registre d'accès et les données du camion", "Tu construis une chronologie vérifiable et cherches les éléments à décharge.",{score:3,rep:2,fee:4000,heat:0}],
          ["Entrer dans le bâtiment sans autorisation pour récupérer le badge", "Preuve obtenue illégalement et risque pénal pour l'équipe.",{score:-4,rep:-5,fee:0,heat:4}],
          ["Te concentrer uniquement sur le témoignage", "Tu négliges une piste matérielle potentiellement décisive.",{score:0,rep:0,fee:0,heat:1}]
        ]},
        {name:"L'expert",scene:"Le laboratoire indique une correspondance partielle sur une manche. L'expert de la défense estime que le mélange biologique ne permet pas d'attribuer la trace à une seule personne.",evidence:["Rapport du laboratoire : mélange de trois contributeurs possible","Échantillon prélevé après manipulation de la manche","Méthode statistique expliquée en annexe"],prompt:"Comment prépares-tu le contre-interrogatoire ?",choices:[
          ["Faire examiner les données brutes par un expert indépendant et tester les limites statistiques", "Tu attaques la portée réelle de la preuve, pas la personne de l'expert.",{score:3,rep:2,fee:3500,heat:0}],
          ["Dire que la science ADN est toujours fausse", "Argument caricatural qui sera facilement démonté.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Ignorer l'annexe technique", "Tu laisses l'accusation imposer son interprétation.",{score:-1,rep:-1,fee:0,heat:1}]
        ]},
        {name:"Le témoin clé",scene:"Un gardien affirme avoir vu Daniel sortir en courant. Dans sa première déclaration, il disait ne pas avoir vu le visage. Il a reconnu Daniel sur une photo publiée par un média.",evidence:["Déclaration initiale : visage non visible","Identification photo après diffusion médiatique","Le gardien avait consommé un médicament affectant la vision nocturne"],prompt:"Quelle approche choisis-tu ?",choices:[
          ["Établir la chronologie des déclarations et les conditions de perception", "Tu fais apparaître les limites de l'identification avec des questions précises.",{score:3,rep:2,fee:3000,heat:-1}],
          ["Humilier le témoin sur sa santé", "Attaque personnelle, peu pertinente et contre-productive.",{score:-2,rep:-3,fee:0,heat:2}],
          ["Lui demander s'il déteste Daniel", "Question vague qui ne teste pas la fiabilité de l'identification.",{score:0,rep:0,fee:0,heat:0}]
        ]},
        {name:"L'offre du procureur",scene:"Le procureur propose une reconnaissance de culpabilité sur une qualification réduite avec une peine recommandée de 12 ans. Le client est terrifié et te demande de choisir pour lui.",evidence:["Offre écrite valable jusqu'à vendredi","Risque de peine nettement supérieur en cas de condamnation au procès","La décision de plaider appartient au client après conseil"],prompt:"Quelle est ta réponse ?",choices:[
          ["Expliquer chaque conséquence, les forces/faiblesses et obtenir une décision libre du client", "Tu conseilles sans prendre la décision à sa place.",{score:3,rep:3,fee:4000,heat:0}],
          ["Accepter l'offre à sa place", "Tu outrepasses ton rôle : le choix du plaidoyer appartient au client.",{score:-5,rep:-6,fee:0,heat:3}],
          ["Refuser sans analyser le risque", "Tu prives le client d'un conseil éclairé sur une décision majeure.",{score:-2,rep:-2,fee:0,heat:1}]
        ]},
        {name:"Le procès",scene:"Le juge autorise l'expert à témoigner. Le gardien reconnaît avoir vu la photo dans les médias. Le jury doit décider si la preuve dépasse le doute raisonnable.",evidence:["Trace biologique non individualisante","Identification contestée","Chronologie partiellement corroborée par les données du parking"],prompt:"Quelle plaidoirie finale choisis-tu ?",choices:[
          ["Relier chaque faiblesse à la charge de la preuve et rappeler que le doute doit profiter à l'accusé", "Plaidoirie rigoureuse. Le verdict reste incertain : les preuves, pas le volume de la voix, décident.",{score:3,rep:3,fee:8000,heat:0}],
          ["Inventer un alibi que Daniel n'a jamais donné", "Tu détruis ta crédibilité et exposes le client à une contradiction.",{score:-5,rep:-6,fee:0,heat:3}],
          ["Affirmer que le procureur a falsifié le dossier sans preuve", "Une accusation grave sans fondement détourne le jury des vrais arguments.",{score:-3,rep:-4,fee:0,heat:2}]
        ]}
      ]
    },
    {
      id:103,title:"HOSTILE TAKEOVER",domain:"Droit des affaires · Conflit entre associés",client:"Meridian Hotels",court:"Delaware Court of Chancery",
      difficulty:"Difficile",fee:65000,reputation:7,
      brief:"Un fonds activiste tente de prendre le contrôle d'une chaîne hôtelière familiale. Le pacte d'actionnaires contient une clause de préemption ambiguë. Deux administrateurs sont soupçonnés d'avoir négocié secrètement avec le fonds.",
      phases:[
        {name:"Le mandat",scene:"La fondatrice veut bloquer l'opération à tout prix. Le directeur général veut vendre. Tu dois identifier qui peut donner des instructions au cabinet.",evidence:["Statuts et pacte d'actionnaires","Procès-verbal du conseil incomplet","Deux mandats concurrents envoyés au cabinet"],prompt:"Quelle est ta priorité ?",choices:[
          ["Identifier le client, vérifier les pouvoirs et traiter le conflit avant toute stratégie", "Tu clarifies la gouvernance et évites de représenter des intérêts opposés.",{score:3,rep:2,fee:0,heat:-1}],
          ["Prendre les instructions de la fondatrice parce qu'elle est majoritaire", "Le contrôle capitalistique ne suffit pas à déterminer qui est ton client.",{score:-2,rep:-2,fee:0,heat:2}],
          ["Envoyer une menace au fonds immédiatement", "Tu agis sans mandat clair ni analyse contractuelle.",{score:-1,rep:-2,fee:0,heat:2}]
        ]},
        {name:"Le pacte",scene:"La clause de préemption prévoit un délai de 20 jours, mais ne précise pas si une offre conditionnelle déclenche le délai.",evidence:["Pacte signé en 2019","Avenant de 2022 non signé par un actionnaire","Projet d'offre du fonds reçu hier"],prompt:"Comment construis-tu ton interprétation ?",choices:[
          ["Comparer texte, avenants, historique de négociation et droit applicable, puis chiffrer les scénarios", "Tu ne réduis pas une clause ambiguë à une lecture isolée.",{score:3,rep:2,fee:4000,heat:0}],
          ["Affirmer que la clause bloque automatiquement toute vente", "Tu avances une certitude que le texte ne permet pas encore.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Ignorer l'avenant non signé", "Il peut éclairer les négociations même si sa force obligatoire est contestée.",{score:0,rep:0,fee:0,heat:0}]
        ]},
        {name:"Les administrateurs",scene:"Un courriel montre qu'un administrateur a reçu une rémunération de conseil du fonds. Il affirme que cela n'a pas influencé son vote.",evidence:["Facture de conseil de 150 000 $","Déclaration d'intérêts incomplète","Vote favorable à l'opération"],prompt:"Quelle action recommandes-tu ?",choices:[
          ["Préserver les documents, examiner les obligations fiduciaires et demander une enquête indépendante", "Tu relies le conflit d'intérêts à une procédure de gouvernance crédible.",{score:3,rep:3,fee:4500,heat:0}],
          ["Publier le courriel sur les réseaux sociaux", "Tu risques la diffamation et compromets la stratégie judiciaire.",{score:-3,rep:-4,fee:0,heat:3}],
          ["Exiger sa démission sans lui donner la possibilité de répondre", "Une mesure précipitée peut fragiliser la décision du conseil.",{score:0,rep:-1,fee:0,heat:1}]
        ]},
        {name:"La table de négociation",scene:"Le fonds propose 30 $ par action. L'expert financier estime la valeur entre 32 et 38 $, mais une procédure pourrait coûter 6 M$ et durer un an.",evidence:["Offre du fonds : 30 $/action","Fourchette d'évaluation : 32–38 $","Risque de baisse du marché"],prompt:"Quelle tactique utilises-tu ?",choices:[
          ["Ancrer à 38 $, exiger des garanties et préparer une zone de compromis documentée", "Tu négocies avec une justification financière et des conditions précises.",{score:3,rep:2,fee:5000,heat:0}],
          ["Refuser toute discussion", "Tu abandonnes un levier sans comparer la valeur du procès et celle d'un accord.",{score:-1,rep:-1,fee:0,heat:1}],
          ["Accepter 30 $ pour finir vite", "Tu ne protèges pas la valeur des actionnaires sans analyse du prix et des garanties.",{score:-2,rep:-2,fee:0,heat:0}]
        ]},
        {name:"L'injonction",scene:"Le fonds veut modifier le conseil avant la fin du délai de préemption. Une audience d'urgence est fixée.",evidence:["Avis de convocation contesté","Clause de préemption ambiguë","Risque de préjudice difficilement réparable allégué"],prompt:"Quelle demande présentes-tu ?",choices:[
          ["Demander une mesure temporaire étroite, avec calendrier accéléré au fond", "Tu relies urgence, préjudice et proportionnalité.",{score:3,rep:3,fee:6000,heat:-1}],
          ["Demander le gel de toutes les opérations du groupe", "Trop large, coûteux et difficile à justifier.",{score:-1,rep:-2,fee:0,heat:2}],
          ["Ne pas comparaître car la clause est claire", "Tu prends le risque de laisser la situation évoluer sans contrôle judiciaire.",{score:-3,rep:-3,fee:0,heat:2}]
        ]},
        {name:"La décision",scene:"Le juge ordonne une suspension de 10 jours et impose une médiation. Les actionnaires doivent voter sur une offre révisée.",evidence:["Offre révisée : 35 $/action avec complément conditionnel","Médiation obligatoire","Le conseil est divisé"],prompt:"Quelle recommandation fais-tu ?",choices:[
          ["Présenter une matrice valeur/risque/délai et recommander un vote éclairé", "Tu aides le client à arbitrer sans confondre victoire procédurale et meilleur résultat économique.",{score:3,rep:3,fee:9000,heat:0}],
          ["Dire que l'injonction signifie que le procès est gagné", "Une mesure provisoire n'est pas une décision au fond.",{score:-3,rep:-4,fee:0,heat:1}],
          ["Signer l'accord sans résolution du conseil", "Tu ne disposes pas du pouvoir de conclure à la place des organes compétents.",{score:-4,rep:-5,fee:0,heat:3}]
        ]}
      ]
    }
         ,{
      id:104,
      title:"THE MISSING HEIR",
      domain:"Droit pénal · Disparition",
      client:"Evelyn Hart",
      court:"Los Angeles County Superior Court",
      difficulty:"Intermédiaire",
      fee:38000,
      reputation:4,
      brief:"Une héritière disparaît après une réunion familiale. Son frère est accusé d'avoir organisé son enlèvement pour contrôler une succession de 60 millions de dollars.",
      phases:[
        {name:"Le mandat",scene:"La police veut interroger ton client immédiatement. Il a reçu plusieurs messages anonymes avant la disparition.",evidence:["Message : Ne viens pas seul","Caméra montrant une voiture similaire à la sienne","Aucun témoin ne l'identifie formellement"],prompt:"Quelle est ta priorité ?",choices:[
          ["Assister le client et vérifier les conditions de l'interrogatoire","Tu protèges ses droits et évites les déclarations précipitées.",{score:3,rep:2,fee:2000,heat:0}],
          ["Lui conseiller de mentir sur ses déplacements","Un faux récit peut détruire sa défense.",{score:-4,rep:-4,fee:0,heat:3}],
          ["Faire fuiter son innocence à la presse","Une communication non vérifiée peut nuire à l'enquête.",{score:-1,rep:-2,fee:0,heat:2}]
        ]},
        {name:"La piste numérique",scene:"Les messages proviennent d'un numéro prépayé. Une caméra de péage place le véhicule à 40 km du lieu supposé.",evidence:["Historique de péage horodaté","Téléphone partagé dans la famille","Métadonnées des messages incomplètes"],prompt:"Que demandes-tu ?",choices:[
          ["Obtenir légalement les données et établir une chronologie","Tu testes les hypothèses avec des éléments vérifiables.",{score:3,rep:2,fee:3500,heat:0}],
          ["Accéder au compte du frère sans autorisation","Tu risques une preuve irrégulière.",{score:-4,rep:-5,fee:0,heat:4}],
          ["Ignorer les données contradictoires","Tu fragilises ton analyse.",{score:-2,rep:-2,fee:0,heat:1}]
        ]},
        {name:"L'audience",scene:"La victime est retrouvée. Elle affirme avoir quitté volontairement la ville, mais hésite à témoigner contre sa famille.",evidence:["Billet acheté avec son propre compte","Caméra de gare confirmant son départ","Aucun lien matériel direct avec le frère"],prompt:"Quelle position défends-tu ?",choices:[
          ["Présenter les preuves et respecter le choix de la victime","Tu distingues les faits établis des suppositions.",{score:3,rep:3,fee:6500,heat:0}],
          ["Faire pression sur la victime","Une pression peut être illégale et contre-productive.",{score:-5,rep:-5,fee:0,heat:4}],
          ["Affirmer que toute l'affaire est inventée","Tu vas au-delà de ce que les pièces démontrent.",{score:-2,rep:-2,fee:0,heat:1}]
        ]}
      ]
    },
    {
      id:105,
      title:"THE SILENT WITNESS",
      domain:"Droit pénal · Agression",
      client:"Marcus Bell",
      court:"Los Angeles County Superior Court",
      difficulty:"Intermédiaire",
      fee:32000,
      reputation:3,
      brief:"Un restaurateur est accusé d'une agression à la sortie de son établissement. Une vidéo partielle circule en ligne et un témoin change sa version.",
      phases:[
        {name:"La vidéo",scene:"La vidéo commence après le début de l'altercation. Ton client reconnaît avoir poussé la victime, mais conteste avoir porté le premier coup.",evidence:["Vidéo de 18 secondes","Rapport médical","Deux versions initiales contradictoires"],prompt:"Quelle démarche ?",choices:[
          ["Obtenir la vidéo complète et préserver l'original","Le contexte et l'authenticité sont essentiels.",{score:3,rep:2,fee:2500,heat:0}],
          ["Publier la vidéo coupée","Une présentation trompeuse peut se retourner contre lui.",{score:-4,rep:-4,fee:0,heat:3}],
          ["Supprimer les publications du client","Cela peut faire disparaître des éléments utiles.",{score:-2,rep:-2,fee:0,heat:2}]
        ]},
        {name:"Le témoin",scene:"Le témoin principal affirme maintenant avoir vu ton client frapper le premier. Sa première déclaration ne le disait pas.",evidence:["Enregistrement de l'appel aux secours","Déclaration écrite 48 heures plus tard","Le témoin connaît la victime"],prompt:"Comment l'interroger ?",choices:[
          ["Comparer précisément les deux récits","Tu fais ressortir les contradictions sans intimider.",{score:3,rep:2,fee:3000,heat:0}],
          ["L'accuser de mentir sans poser de questions","Tu perds l'occasion d'établir les contradictions.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Lui proposer un avantage pour changer son récit","C'est une conduite gravement irrégulière.",{score:-5,rep:-6,fee:0,heat:5}]
        ]},
        {name:"La résolution",scene:"Le procureur propose une infraction réduite et une peine aménageable. Ton client veut absolument aller au procès.",evidence:["Vidéo incomplète","Blessure médicalement constatée","Témoin contestable"],prompt:"Que lui recommandes-tu ?",choices:[
          ["Présenter les risques comparés et lui laisser la décision","Le client décide après un conseil complet.",{score:3,rep:3,fee:6000,heat:0}],
          ["Promettre une relaxe certaine","Tu ne peux pas garantir un verdict.",{score:-3,rep:-3,fee:0,heat:2}],
          ["Accepter à sa place","Le choix lui appartient.",{score:-5,rep:-5,fee:0,heat:3}]
        ]}
      ]
    },
    {
      id:106,
      title:"THE INSIDER",
      domain:"Droit des affaires · Délit d'initié",
      client:"Apex Capital",
      court:"U.S. District Court · California",
      difficulty:"Difficile",
      fee:72000,
      reputation:7,
      brief:"Un gestionnaire de fonds est soupçonné d'avoir négocié des titres avant une annonce confidentielle. Les autorités examinent ses appels et ses ordres de bourse.",
      phases:[
        {name:"L'alerte",scene:"Le client affirme que ses opérations reposaient sur une analyse publique. Un analyste lui a pourtant envoyé un fichier confidentiel.",evidence:["Courriel avec pièce jointe","Ordres passés deux heures avant l'annonce","Note de recherche datée de la veille"],prompt:"Que fais-tu ?",choices:[
          ["Préserver les communications et reconstituer la chronologie","Tu distingues les sources publiques et confidentielles.",{score:3,rep:2,fee:3500,heat:0}],
          ["Effacer le fichier reçu","La destruction aggrave considérablement le risque.",{score:-5,rep:-6,fee:0,heat:5}],
          ["Contacter l'analyste pour harmoniser vos versions","Tu risques de compromettre les témoignages.",{score:-4,rep:-4,fee:0,heat:4}]
        ]},
        {name:"L'enquête interne",scene:"Les logs montrent que trois employés ont ouvert le fichier. Le client veut identifier un bouc émissaire.",evidence:["Journaux d'accès","Politique de conformité","Ordres de trading de trois comptes"],prompt:"Quelle méthode ?",choices:[
          ["Mandater une enquête indépendante","Tu évites les conclusions prématurées.",{score:3,rep:3,fee:5000,heat:0}],
          ["Désigner le junior sans l'entendre","Tu sacrifies l'équité et la fiabilité de l'enquête.",{score:-3,rep:-3,fee:0,heat:2}],
          ["Demander la suppression des messages","Tu risques une destruction de preuves.",{score:-5,rep:-6,fee:0,heat:5}]
        ]},
        {name:"La réponse",scene:"L'enquête confirme un accès au fichier avant les opérations, mais ne prouve pas qui a transmis l'information.",evidence:["Accès confirmé","Source de la fuite inconnue","Gain financier de 1,2 million de dollars"],prompt:"Quelle stratégie ?",choices:[
          ["Évaluer la coopération et les risques réglementaires","Tu présentes des options réalistes au conseil.",{score:3,rep:3,fee:9000,heat:0}],
          ["Nier tout accès malgré les logs","Une affirmation contredite par les pièces détruit la crédibilité.",{score:-4,rep:-5,fee:0,heat:3}],
          ["Improviser un remboursement sans conseil","Une initiative improvisée ne règle pas les obligations légales.",{score:-2,rep:-2,fee:0,heat:1}]
        ]}
      ]
    }
         ,{
      id:107,
      title:"THE BROKEN DEAL",
      domain:"Droit des affaires · Rupture contractuelle",
      client:"Westbridge Studios",
      court:"California Superior Court",
      difficulty:"Facile",
      fee:26000,
      reputation:2,
      brief:"Un studio accuse un distributeur d'avoir rompu un contrat exclusif avant la sortie d'un film. Les pertes annoncées dépassent 4 millions de dollars.",
      phases:[
        {name:"Le contrat",scene:"Le contrat prévoit une exclusivité, mais une clause autorise certaines distributions numériques.",evidence:["Contrat signé","Annexe numérique","Échanges de négociation"],prompt:"Quelle analyse ?",choices:[
          ["Lire le contrat, ses annexes et les échanges","Tu interprètes l'accord dans son ensemble.",{score:3,rep:2,fee:1500,heat:0}],
          ["Citer uniquement la clause d'exclusivité","Tu ignores une exception potentiellement décisive.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Menacer immédiatement d'une action pénale","Le différend est d'abord contractuel.",{score:-2,rep:-2,fee:0,heat:2}]
        ]},
        {name:"Le préjudice",scene:"Le distributeur affirme que les ventes auraient été faibles. Les projections du studio sont optimistes.",evidence:["Prévisions internes","Ventes comparables","Coûts marketing"],prompt:"Comment chiffrer ?",choices:[
          ["Faire établir une expertise avec plusieurs scénarios","Tu relies les demandes à des données vérifiables.",{score:3,rep:2,fee:3000,heat:0}],
          ["Réclamer 20 millions au hasard","Une demande non étayée affaiblit le dossier.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Cacher les prévisions défavorables","Tu compromets la crédibilité du client.",{score:-4,rep:-4,fee:0,heat:3}]
        ]},
        {name:"L'accord",scene:"Le distributeur propose 2,5 millions et une nouvelle fenêtre de diffusion.",evidence:["Offre écrite","Expertise provisoire","Coût estimé du procès : 900 000 $"],prompt:"Que conseilles-tu ?",choices:[
          ["Comparer valeur nette, délai, garanties et risques","Tu aides le client à décider sur une base économique.",{score:3,rep:3,fee:5500,heat:0}],
          ["Refuser par principe","Tu négliges une solution potentiellement avantageuse.",{score:-1,rep:-1,fee:0,heat:1}],
          ["Signer sans autorisation du studio","Tu dépasses ton mandat.",{score:-4,rep:-5,fee:0,heat:3}]
        ]}
      ]
    },
    {
      id:108,
      title:"THE FALSE ALIBI",
      domain:"Droit pénal · Cambriolage",
      client:"Noah Price",
      court:"Los Angeles County Superior Court",
      difficulty:"Intermédiaire",
      fee:35000,
      reputation:4,
      brief:"Un étudiant est accusé d'un cambriolage. Son alibi repose sur un reçu de restaurant dont l'heure semble avoir été modifiée.",
      phases:[
        {name:"Le reçu",scene:"Le client affirme être au restaurant à l'heure du cambriolage. Le reçu numérique comporte une anomalie.",evidence:["Reçu PDF","Paiement bancaire","Caméra du restaurant"],prompt:"Que vérifies-tu ?",choices:[
          ["Demander les données originales au commerçant","Tu vérifies la source plutôt que la copie.",{score:3,rep:2,fee:2000,heat:0}],
          ["Modifier le PDF pour corriger l'heure","Tu fabriques une preuve.",{score:-5,rep:-7,fee:0,heat:5}],
          ["Écarter l'alibi sans enquête","Tu abandonnes une piste utile.",{score:-1,rep:-1,fee:0,heat:1}]
        ]},
        {name:"La chronologie",scene:"La banque confirme un paiement à proximité, mais 25 minutes avant le cambriolage.",evidence:["Transaction horodatée","Trajet estimé de 18 minutes","Caméra avec horloge décalée"],prompt:"Quelle piste ?",choices:[
          ["Faire vérifier les horloges et les temps de trajet","Tu testes l'alibi avec des données fiables.",{score:3,rep:2,fee:3000,heat:0}],
          ["Prétendre que le paiement prouve toute la soirée","La preuve ne démontre pas plus que son contenu.",{score:-2,rep:-2,fee:0,heat:1}],
          ["Demander au client de contacter le témoin","Tu risques d'influencer son récit.",{score:-3,rep:-3,fee:0,heat:2}]
        ]},
        {name:"Le procès",scene:"Une empreinte est retrouvée sur une fenêtre, mais le lieu était accessible au public.",evidence:["Empreinte partielle","Accès public au bâtiment","Alibi partiellement corroboré"],prompt:"Quelle défense ?",choices:[
          ["Contester la valeur de l'empreinte et rappeler la charge de la preuve","Tu relies les limites techniques au contexte.",{score:3,rep:3,fee:6500,heat:0}],
          ["Inventer un second témoin","Tu crées une fausse preuve.",{score:-5,rep:-6,fee:0,heat:4}],
          ["Ignorer l'empreinte","Tu laisses une preuve importante sans réponse.",{score:-2,rep:-2,fee:0,heat:1}]
        ]}
      ]
    },
    {
      id:109,
      title:"THE DATA LEAK",
      domain:"Droit des affaires · Données personnelles",
      client:"Helix Health",
      court:"California Superior Court",
      difficulty:"Difficile",
      fee:68000,
      reputation:6,
      brief:"Une plateforme de santé découvre qu'un prestataire a exposé des dossiers utilisateurs. Le régulateur demande des explications sous 48 heures.",
      phases:[
        {name:"La fuite",scene:"Des données sensibles ont été accessibles depuis un lien mal configuré. Le prestataire affirme qu'aucun téléchargement n'a eu lieu.",evidence:["Logs d'accès incomplets","Contrat de sous-traitance","Capture d'écran publiée en ligne"],prompt:"Quelle urgence ?",choices:[
          ["Sécuriser l'accès, préserver les logs et lancer une analyse","Tu limites le risque et protèges les preuves.",{score:3,rep:3,fee:4000,heat:0}],
          ["Effacer les logs pour protéger la réputation","Tu détruis des éléments essentiels.",{score:-5,rep:-6,fee:0,heat:5}],
          ["Accuser publiquement le prestataire","Tu communiques avant d'avoir établi les faits.",{score:-2,rep:-3,fee:0,heat:2}]
        ]},
        {name:"Les notifications",scene:"L'équipe ne sait pas encore combien de personnes sont concernées. Le délai légal dépend de plusieurs facteurs.",evidence:["8 000 personnes potentiellement touchées","Données médicales concernées","Analyse forensique en cours"],prompt:"Comment répondre ?",choices:[
          ["Vérifier les obligations applicables et préparer une notification exacte","Tu évites retard et information trompeuse.",{score:3,rep:2,fee:4500,heat:0}],
          ["Annoncer zéro victime sans preuve","Tu prends un risque de déclaration inexacte.",{score:-4,rep:-4,fee:0,heat:3}],
          ["Attendre sans vérifier les délais","Tu risques de manquer une échéance.",{score:-3,rep:-3,fee:0,heat:2}]
        ]},
        {name:"Le recours",scene:"Un groupe d'utilisateurs envisage une action collective. Le prestataire invoque une clause limitative de responsabilité.",evidence:["Contrat client","Contrat prestataire","Rapport d'incident préliminaire"],prompt:"Quelle stratégie ?",choices:[
          ["Analyser responsabilités, clauses et mesures de réparation","Tu construis une réponse documentée.",{score:3,rep:3,fee:8500,heat:0}],
          ["Faire signer des renonciations sous pression","Tu aggraves le risque juridique.",{score:-4,rep:-5,fee:0,heat:4}],
          ["Poursuivre sans chiffrer le préjudice","Tu avances sans base suffisante.",{score:-1,rep:-1,fee:0,heat:1}]
        ]}
      ]
    }
  ];
  const key = "lf_simulation_v1";
  let state;
  try { state = JSON.parse(localStorage.getItem(key)) || null; } catch {}
  state ||= {caseProgress:{}, reputation:50, cash:125000, completed:[], history:[]};
  const save = () => localStorage.setItem(key, JSON.stringify(state));
  const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const card = c => {
    const p = state.caseProgress[c.id] || {step:0,answers:[],score:0};
    const done = state.completed.includes(c.id);
    return `<article class="sim-case ${done?"done":""}"><div class="sim-top"><span>DOSSIER ${c.id}</span><b>${esc(c.difficulty)}</b></div><h3>${esc(c.title)}</h3><p>${esc(c.domain)}</p><small>Client : ${esc(c.client)}</small><div class="sim-meter"><i style="width:${done?100:Math.round(p.step/c.phases.length*100)}%"></i></div><button class="sim-btn" data-sim-open="${c.id}">${done?"Consulter le dossier":p.step?"Reprendre le dossier":"Ouvrir le dossier"}</button></article>`;
  };
  function render() {
    const root = $("game");
    if (!root) return;
    root.innerHTML = `<div class="sim-shell">
      <div class="sim-mast"><div><span class="sim-kicker">LAW FIRM & ASSOCIATES · CAMPAGNE</span><h1>Le pouvoir se gagne au dossier.</h1><p>Chaque décision a un coût. Chaque preuve a une histoire. Chaque client a ses limites.</p></div><div class="sim-stats"><div><small>RÉPUTATION</small><strong>${state.reputation}/100</strong></div><div><small>TRÉSORERIE</small><strong>${state.cash.toLocaleString("fr-FR")} $</strong></div><div><small>AFFAIRES GAGNÉES / TERMINÉES</small><strong>${state.completed.length}/${cases.length}</strong></div></div></div>
      <div class="sim-warning">Univers fictif inspiré des procédures américaines. Les règles sont volontairement simplifiées : ce jeu n'est pas un outil juridique.</div>
      <div class="sim-section-title"><div><span class="sim-kicker">PORTFOLIO</span><h2>Affaires disponibles</h2></div><span>${cases.length} dossiers · Pénal & affaires</span></div>
      <div class="sim-grid">${cases.map(card).join("")}</div>
      <div id="sim-detail"></div>
    </div>`;
    root.querySelectorAll("[data-sim-open]").forEach(b=>b.onclick=()=>open(+b.dataset.simOpen));
  }
  function open(id) {
    const c=cases.find(x=>x.id===id); if(!c)return;
    const p=state.caseProgress[id] || {step:0,answers:[],score:0};
    const step=Math.min(p.step,c.phases.length-1), phase=c.phases[step], answer=p.answers[step];
    const d=$("sim-detail");
    d.innerHTML=`<section class="sim-detail"><div class="sim-detail-head"><div><span class="sim-kicker">DOSSIER ${c.id} · ${esc(c.court)}</span><h2>${esc(c.title)}</h2><p>${esc(c.brief)}</p></div><button class="sim-close" id="sim-close">Fermer ×</button></div>
      <div class="sim-progress"><span>ÉTAPE ${step+1} / ${c.phases.length}</span><div><i style="width:${(step+1)/c.phases.length*100}%"></i></div><b>${p.score} points</b></div>
      <div class="sim-columns"><article class="sim-scene"><span class="sim-kicker">SITUATION</span><h3>${esc(phase.name)}</h3><p>${esc(phase.scene)}</p><h4>Pièces et éléments connus</h4><ul>${phase.evidence.map(e=>`<li>${esc(e)}</li>`).join("")}</ul></article>
      <aside class="sim-decision"><span class="sim-kicker">À TOI DE JOUER</span><h3>${esc(phase.prompt)}</h3><div class="sim-choices">${phase.choices.map((ch,i)=>`<button class="sim-choice" data-sim-choice="${i}" ${answer!==undefined?"disabled":""}><b>${String.fromCharCode(65+i)}.</b> ${esc(ch[0])}</button>`).join("")}</div>
      <div id="sim-feedback">${answer!==undefined?feedback(phase.choices[answer]):""}</div>
      <div class="sim-controls">${step>0?'<button class="sim-secondary" id="sim-prev">Étape précédente</button>':""}${answer!==undefined?(step<c.phases.length-1?'<button class="sim-btn" id="sim-next">Continuer →</button>':'<button class="sim-btn" id="sim-finish">Clôturer le dossier</button>'):""}</div></aside></div></section>`;
    $("sim-close").onclick=()=>{$("sim-detail").innerHTML="";};
    d.querySelectorAll("[data-sim-choice]").forEach(b=>b.onclick=()=>{
      const i=+b.dataset.simChoice, effect=phase.choices[i][2];
      p.answers[step]=i;p.score+=effect.score;state.reputation=Math.max(0,Math.min(100,state.reputation+effect.rep));state.cash+=effect.fee;state.history.push({case:c.title,phase:phase.name,choice:phase.choices[i][0],score:effect.score});
      state.caseProgress[id]=p;save();open(id);
    });
    if($("sim-prev"))$("sim-prev").onclick=()=>{p.step=Math.max(0,step-1);state.caseProgress[id]=p;save();open(id);};
    if($("sim-next"))$("sim-next").onclick=()=>{p.step=step+1;state.caseProgress[id]=p;save();open(id);};
    if($("sim-finish"))$("sim-finish").onclick=()=>{
      const outcome=p.score>=10?"Issue favorable / position renforcée":p.score>=4?"Accord ou résultat mitigé":"Position fragilisée : conséquences et réputation en baisse";
      state.completed=[...new Set([...state.completed,id])];state.reputation=Math.max(0,Math.min(100,state.reputation+(p.score>=10?4:-5)));save();render();
      $("sim-detail").innerHTML=`<section class="sim-detail sim-end"><span class="sim-kicker">DOSSIER CLÔTURÉ</span><h2>${esc(c.title)}</h2><h3>${esc(outcome)}</h3><p>Score stratégique : ${p.score}. Réputation actuelle : ${state.reputation}/100.</p><p>Le dossier est archivé dans ta campagne. Tu peux le rouvrir pour consulter les décisions.</p></section>`;
    };
    d.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function feedback(ch){const e=ch[2];return `<div class="sim-feedback"><b>CONSÉQUENCE</b><p>${esc(ch[1])}</p><small>Impact : ${e.score>0?"+":""}${e.score} stratégie · ${e.rep>0?"+":""}${e.rep} réputation · ${e.fee?"+$"+e.fee:"aucun honoraire supplémentaire"}</small></div>`;}
  // Replace the old shallow campaign renderer without touching the client/case management.
  window.renderGame = render;
  window.openGameCase = open;
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();
})();
