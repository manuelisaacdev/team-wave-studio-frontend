
enum Privacy {
    PUBLIC="PUBLIC",
    PRIVATE="PRIVATE",
    FOLLOWER="FOLLOWER",
    COMMUNITY="COMMUNITY"
}

export const PrivacyLabel = {
    [Privacy.PUBLIC]: "Público",
    [Privacy.PRIVATE]: "Privado",
    [Privacy.FOLLOWER]: "Seguidores",
    [Privacy.COMMUNITY]: "Comunidade"
}

export default Privacy;