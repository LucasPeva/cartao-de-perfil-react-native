import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export default function App() {
  const [userData, setUserData] = useState({
    nome: "",
    cargo: "",
    biografia: "",
    imagemUrl: "",
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setUserData({
      nome: "",
      cargo: "",
      biografia: "",
      imagemUrl: "",
    });
  };

  const handlePreenchimentoExemplo = () => {
    setUserData({
      nome: "Lucas Soares Pevarello",
      cargo: "Programador Júnior",
      biografia:
        "Cursando Análise e Desenvolvimento de Sistemas na Faculdade de Tecnologia SENAI Félix Guisard. Trabalhando como Programador Júnior, com foco em desenvolvimento frontend, utilizando principalmente React. Possuo noções de backend com Python com Flask e Django, JavaScript com Express.js e NodeJS e bancos de dados MySQL e PostgresSQL.",
      imagemUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocL9P5jgpcf9jUqdrJF88XkQaMKRexSXzJ7ebsyovzHW9aNUyw=s576-c-mo-no",
    });
  };

  const FormularioSection = () => (
    <View style={styles.formularioContainer}>
      <Text style={styles.titulo}>Criar Cartão de Perfil</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Usuário</Text>
        <TextInput
          style={styles.input}
          value={userData.nome}
          onChangeText={(text) => handleInputChange("nome", text)}
          placeholder="Digite seu nome completo"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cargo ou Título</Text>
        <TextInput
          style={styles.input}
          value={userData.cargo}
          onChangeText={(text) => handleInputChange("cargo", text)}
          placeholder="Ex: Desenvolvedor Frontend, Designer UX/UI"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>URL da Imagem de Perfil</Text>
        <TextInput
          style={styles.input}
          value={userData.imagemUrl}
          onChangeText={(text) => handleInputChange("imagemUrl", text)}
          placeholder="https://exemplo.com/sua-foto.jpg"
          placeholderTextColor="#9CA3AF"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Biografia (2-3 linhas)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={userData.biografia}
          onChangeText={(text) => handleInputChange("biografia", text)}
          placeholder="Conte um pouco sobre você, suas habilidades e experiências..."
          placeholderTextColor="#9CA3AF"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.exemploButton]}
          onPress={handlePreenchimentoExemplo}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Exemplo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CartaoSection = () => (
    <View style={styles.cartaoContainer}>
      <View style={styles.cartao}>
        {/* Imagem de Perfil */}
        <View style={styles.imagemContainer}>
          {userData.imagemUrl ? (
            <Image
              source={{ uri: userData.imagemUrl }}
              style={styles.imagemPerfil}
              onError={() => {
                // Em caso de erro, poderia implementar fallback
              }}
            />
          ) : (
            <View style={styles.imagemPlaceholder}>
              <Text style={styles.imagemPlaceholderText}>👤</Text>
            </View>
          )}
        </View>

        {/* Informações do Perfil */}
        <Text style={styles.nomeCartao}>{userData.nome || "Seu Nome"}</Text>

        <Text style={styles.cargoCartao}>{userData.cargo || "Seu Cargo"}</Text>

        <View style={styles.biografiaContainer}>
          <Text style={styles.biografiaCartao}>
            {userData.biografia ||
              "Adicione uma biografia para contar um pouco sobre você, suas habilidades e experiências profissionais."}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={isTablet ? styles.desktopLayout : styles.mobileLayout}>
          <FormularioSection />
          <CartaoSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  desktopLayout: {
    flexDirection: "row",
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    gap: 40,
    alignItems: "flex-start",
  },
  mobileLayout: {
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    gap: 30,
  },

  // Estilos do Formulário
  formularioContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2c3e50",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "white",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exemploButton: {
    backgroundColor: "#10b981",
  },
  resetButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Estilos do Cartão
  cartaoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cartao: {
    backgroundColor: "#667eea",
    padding: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
    alignItems: "center",
    minWidth: 320,
    maxWidth: 400,
    width: "100%",
  },
  imagemContainer: {
    marginBottom: 24,
  },
  imagemPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  imagemPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  imagemPlaceholderText: {
    fontSize: 40,
    color: "rgba(255, 255, 255, 0.8)",
  },
  nomeCartao: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cargoCartao: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  biografiaContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
  },
  biografiaCartao: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255, 255, 255, 0.95)",
    textAlign: "center",
  },
});
